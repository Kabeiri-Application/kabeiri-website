"use server";

import { revalidatePath } from "next/cache";

import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { auditLogTable, profilesTable, type Profile } from "@/db/app.schema";
import { organization } from "@/db/auth.schema";
import { auth } from "@/lib/auth";

import {
  isLastOwner,
  requirePermission,
  type Role,
} from "@/lib/authz";

import { addUserFormSchema, updateUserFormSchema, updateOrganizationFormSchema } from "./schema";

// User Management Actions

export async function getOrganizationUsers(): Promise<Profile[]> {
  const context = await requirePermission("USER_READ");
  
  const users = await db.query.profilesTable.findMany({
    where: and(
      eq(profilesTable.organization, context.organizationId),
      isNull(profilesTable.deletedAt)
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
      isNull(profilesTable.deletedAt)
    ),
  });
  
  return user || null;
}

export async function updateUser(
  userId: string,
  data: z.infer<typeof updateUserFormSchema>
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("USER_UPDATE", userId);
    
    // Get current user data for audit log
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
    
    // Create audit log
    await db.insert(auditLogTable).values({
      actorId: context.userId,
      action: "USER_UPDATE",
      targetTable: "profiles",
      targetId: userId,
      before: JSON.stringify(currentUser),
      after: JSON.stringify({ ...currentUser, ...data }),
      organization: context.organizationId,
    });
    
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
  newRole: Role
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
    
    // Create audit log
    await db.insert(auditLogTable).values({
      actorId: context.userId,
      action: "USER_ROLE_CHANGE",
      targetTable: "profiles",
      targetId: userId,
      before: JSON.stringify({ role: currentUser.role }),
      after: JSON.stringify({ role: newRole }),
      organization: context.organizationId,
    });
    
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
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("USER_DELETE", userId);
    
    // Prevent self-deletion
    if (userId === context.userId) {
      return { success: false, error: "Cannot delete your own account" };
    }
    
    // Get current user data for audit log
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
    
    // Create audit log
    await db.insert(auditLogTable).values({
      actorId: context.userId,
      action: "USER_DELETE",
      targetTable: "profiles",
      targetId: userId,
      before: JSON.stringify(currentUser),
      after: JSON.stringify({ ...currentUser, deletedAt: new Date() }),
      organization: context.organizationId,
    });
    
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

export async function addUser(data: z.infer<typeof addUserFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("USER_INVITE");
    
    // Create user through auth system
    const newUserResult = await auth.api.signUpEmail({
      body: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      },
    });
    
    // Check if user creation was successful
    if (!newUserResult?.user?.id) {
      return { success: false, error: "Failed to create user account" };
    }
    
    // Create profile
    await db.insert(profilesTable).values({
      id: newUserResult.user.id,
      username: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      organization: context.organizationId,
      phone: data.phone || "",
      streetAddress: data.streetAddress || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
    });
    
    // Create audit log
    await db.insert(auditLogTable).values({
      actorId: context.userId,
      action: "USER_CREATE",
      targetTable: "profiles",
      targetId: newUserResult.user.id,
      before: null,
      after: JSON.stringify(data),
      organization: context.organizationId,
    });
    
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
  data: z.infer<typeof updateOrganizationFormSchema>
): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requirePermission("ORG_UPDATE");
    
    // Get current organization data for audit log
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
    
    // Create audit log
    await db.insert(auditLogTable).values({
      actorId: context.userId,
      action: "ORG_UPDATE",
      targetTable: "organization",
      targetId: context.organizationId,
      before: JSON.stringify(currentOrg),
      after: JSON.stringify({ ...currentOrg, ...data }),
      organization: context.organizationId,
    });
    
    revalidatePath("/dashboard/settings/adminSettings/organization");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating organization:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update organization",
    };
  }
}

export async function transferOwnership(
  targetUserId: string
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
      
      // Create audit logs
      await tx.insert(auditLogTable).values([
        {
          actorId: context.userId,
          action: "OWNER_TRANSFER",
          targetTable: "profiles",
          targetId: context.userId,
          before: JSON.stringify({ role: "owner" }),
          after: JSON.stringify({ role: "admin" }),
          organization: context.organizationId,
        },
        {
          actorId: context.userId,
          action: "OWNER_TRANSFER",
          targetTable: "profiles",
          targetId: targetUserId,
          before: JSON.stringify({ role: targetUser.role }),
          after: JSON.stringify({ role: "owner" }),
          organization: context.organizationId,
        },
      ]);
    });
    
    revalidatePath("/dashboard/settings/adminSettings/manageUsers");
    revalidatePath("/dashboard/settings/adminSettings/organization");
    
    return { success: true };
  } catch (error) {
    console.error("Error transferring ownership:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to transfer ownership",
    };
  }
}
