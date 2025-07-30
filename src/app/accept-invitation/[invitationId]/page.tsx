import { redirect } from 'next/navigation';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { invitation } from '@/db/auth.schema';
import { AcceptInvitationForm } from './_components/AcceptInvitationForm';

interface AcceptInvitationPageProps {
  params: Promise<{ invitationId: string }>;
}

export default async function AcceptInvitationPage({
  params,
}: AcceptInvitationPageProps) {
  const { invitationId } = await params;

  // Find the invitation
  const invite = await db.query.invitation.findFirst({
    where: and(
      eq(invitation.id, invitationId),
      eq(invitation.status, 'pending')
    ),
    with: {
      organization: true,
    },
  });

  // Check if invitation exists and is valid
  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Invalid Invitation
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This invitation link is invalid or has already been used.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check if invitation has expired
  if (invite.expiresAt && new Date() > invite.expiresAt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Invitation Expired
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This invitation has expired. Please contact your administrator for a new invitation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Join {invite.organization.name}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            You&apos;ve been invited to join as a <strong>{invite.role}</strong>
          </p>
        </div>

        <AcceptInvitationForm 
          invitation={invite} 
          organizationName={invite.organization.name}
        />
      </div>
    </div>
  );
}
