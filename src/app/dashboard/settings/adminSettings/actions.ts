"use server";

import { revalidatePath } from "next/cache";

import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { profilesTable, type Profile } from "@/db/app.schema";
import { invitation, organization } from "@/db/auth.schema";
import { sendInvitationEmail } from "@/lib/email";
import { isLastOwner, requirePermission, type Role } from "@/lib/authz";

import {
  addUserFormSchema,
  updateOrganizationFormSchema,
  updateUserFormSchema,
} from "./schema";

// User Management Actions

export async function getOrganizationUsers(): Promise<Profile[]> {
  const context = await requirePermission("USER_READ");

  const users = await db.query.profilesTable.findMany({
    where: and(
      eq(profilesTable.organization, context.organizationId),
      isNull(profilesTable.deletedAt),
    ),
  });

  return users;
}

export async function getUserById(userId: string): Promise<Profile | null> {
  const context = await requirePermission("USER_READ", userId);

  const user = await db.query.profilesTable.findFirst({
    where: and(
      eq(profilesTable.id, userId),
      eq(profilesTable.organization, context.organizationId),
      isNull(profilesTable.deletedAt),
    ),
  });

  return user || null;
}

export async function updateUser(
  userId: string,
  data: z.infer<typeof updateUserFormSchema>,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Context is used by requirePermission for authorization
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const context = await requirePermission("USER_UPDATE", userId);

    // Verify user exists
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      return { success: false, error: "User not found" };
    }

    // Update user
    await db
      .update(profilesTable)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phone: data.phone,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      })
      .where(eq(profilesTable.id, userId));

    revalidatePath(`/dashboard/settings/adminSettings/manageUsers/${userId}`);
    revalidatePath("/dashboard/settings/adminSettings/manageUsers");

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    };
  }
}

export async function changeUserRole(
  userId: string,
  newRole: Role,
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("USER_ROLE_CHANGE", userId);

    // Get current user data
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      return { success: false, error: "User not found" };
    }

    // Prevent demoting the last owner
    if (currentUser.role === "owner" && newRole !== "owner") {
      const isLast = await isLastOwner(userId, context.organizationId);
      if (isLast) {
        return {
          success: false,
          error: "Cannot demote the last owner. Transfer ownership first.",
        };
      }
    }

    // Update role
    await db
      .update(profilesTable)
      .set({ role: newRole })
      .where(eq(profilesTable.id, userId));

    revalidatePath(`/dashboard/settings/adminSettings/manageUsers/${userId}`);
    revalidatePath("/dashboard/settings/adminSettings/manageUsers");

    return { success: true };
  } catch (error) {
    console.error("Error changing user role:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to change role",
    };
  }
}

export async function deleteUser(
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("USER_DELETE", userId);

    // Prevent self-deletion
    if (userId === context.userId) {
      return { success: false, error: "Cannot delete your own account" };
    }

    // Verify user exists
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      return { success: false, error: "User not found" };
    }

    // Prevent deleting the last owner
    if (currentUser.role === "owner") {
      const isLast = await isLastOwner(userId, context.organizationId);
      if (isLast) {
        return {
          success: false,
          error: "Cannot delete the last owner. Transfer ownership first.",
        };
      }
    }

    // Soft delete user
    await db
      .update(profilesTable)
      .set({ deletedAt: new Date() })
      .where(eq(profilesTable.id, userId));

    revalidatePath("/dashboard/settings/adminSettings/manageUsers");

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}

export async function addUser(
  data: z.infer<typeof addUserFormSchema>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("USER_INVITE");

    // Check if user is already invited or is a member
    const existingUser = await db.query.profilesTable.findFirst({
      where: and(
        eq(profilesTable.username, data.email),
        eq(profilesTable.organization, context.organizationId),
        isNull(profilesTable.deletedAt)
      ),
    });

    if (existingUser) {
      return {
        success: false,
        error: "User is already a member of this organization"
      };
    }

    const existingInvitation = await db.query.invitation.findFirst({
      where: and(
        eq(invitation.email, data.email),
        eq(invitation.organizationId, context.organizationId),
        eq(invitation.status, "pending")
      ),
    });

    if (existingInvitation) {
      return {
        success: false,
        error: "User has already been invited"
      };
    }

    // Create invitation record
    const invitationId = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    await db.insert(invitation).values({
      id: invitationId,
      organizationId: context.organizationId,
      email: data.email,
      role: data.role,
      status: "pending",
      expiresAt,
      inviterId: context.userId,
    });

    // Send invitation email
    try {
      // Get organization and inviter details
      const org = await getOrganization();
      const inviter = await db.query.profilesTable.findFirst({
        where: eq(profilesTable.id, context.userId),
      });

      if (org && inviter) {
        await sendInvitationEmail({
          email: data.email,
          invitedByName: `${inviter.firstName} ${inviter.lastName}`,
          organizationName: org.name,
          role: data.role,
          invitationId,
        });
        console.log('Invitation email sent successfully to:', data.email);
      }
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
      // Still return success since invitation was created in database
    }

    revalidatePath("/dashboard/settings/adminSettings/manageUsers");

    return { success: true };
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add user",
    };
  }
}

// Organization Management Actions

export async function getOrganization() {
  const context = await requirePermission("ORG_READ");

  const org = await db.query.organization.findFirst({
    where: eq(organization.id, context.organizationId),
  });

  return org;
}

export async function updateOrganization(
  data: z.infer<typeof updateOrganizationFormSchema>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("ORG_UPDATE");

    // Verify organization exists
    const currentOrg = await getOrganization();
    if (!currentOrg) {
      return { success: false, error: "Organization not found" };
    }

    // Update organization
    await db
      .update(organization)
      .set({
        name: data.name,
        businessName: data.businessName,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        phone: data.phone,
        website: data.website,
      })
      .where(eq(organization.id, context.organizationId));

    revalidatePath("/dashboard/settings/adminSettings/organization");

    return { success: true };
  } catch (error) {
    console.error("Error updating organization:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update organization",
    };
  }
}

export async function transferOwnership(
  targetUserId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("OWNER_TRANSFER", targetUserId);

    // Get target user
    const targetUser = await getUserById(targetUserId);
    if (!targetUser) {
      return { success: false, error: "Target user not found" };
    }

    // Update both users' roles
    await db.transaction(async (tx) => {
      // Demote current owner to admin
      await tx
        .update(profilesTable)
        .set({ role: "admin" })
        .where(eq(profilesTable.id, context.userId));

      // Promote target user to owner
      await tx
        .update(profilesTable)
        .set({ role: "owner" })
        .where(eq(profilesTable.id, targetUserId));
    });

    revalidatePath("/dashboard/settings/adminSettings/manageUsers");
    revalidatePath("/dashboard/settings/adminSettings/organization");

    return { success: true };
  } catch (error) {
    console.error("Error transferring ownership:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to transfer ownership",
    };
  }
}
