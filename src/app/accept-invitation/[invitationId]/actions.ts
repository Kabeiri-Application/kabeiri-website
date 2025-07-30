'use server';

import { redirect } from 'next/navigation';
import { and, eq } from 'drizzle-orm';

import { auth } from '@/lib/auth';
import { db } from '@/db';
import { profilesTable } from '@/db/app.schema';
import { invitation } from '@/db/auth.schema';
import { sendWelcomeEmail } from '@/lib/email';

interface AcceptInvitationData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: string;
  organizationId: string;
}

export async function acceptInvitation(
  invitationId: string,
  data: AcceptInvitationData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Find and validate the invitation
    const invite = await db.query.invitation.findFirst({
      where: and(
        eq(invitation.id, invitationId),
        eq(invitation.status, 'pending')
      ),
      with: {
        organization: true,
      },
    });

    if (!invite) {
      return { success: false, error: 'Invalid or expired invitation' };
    }

    // Check if invitation has expired
    if (invite.expiresAt && new Date() > invite.expiresAt) {
      return { success: false, error: 'Invitation has expired' };
    }

    // Check if user already exists
    const existingUser = await db.query.profilesTable.findFirst({
      where: eq(profilesTable.email, data.email),
    });

    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Create the user account using better-auth
    const userResult = await auth.api.signUpEmail({
      body: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      },
    });

    if (!userResult?.user?.id) {
      return { success: false, error: 'Failed to create user account' };
    }

    // Update the user profile with organization and role information
    await db
      .update(profilesTable)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        organization: data.organizationId,
        role: data.role as 'user' | 'admin' | 'owner',
      })
      .where(eq(profilesTable.id, userResult.user.id));

    // Mark invitation as accepted
    await db
      .update(invitation)
      .set({
        status: 'accepted',
        acceptedAt: new Date(),
      })
      .where(eq(invitation.id, invitationId));

    // Send welcome email
    try {
      await sendWelcomeEmail({
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        organizationName: invite.organization.name,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the entire process if email fails
    }

    return { success: true };
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to accept invitation',
    };
  }
}
