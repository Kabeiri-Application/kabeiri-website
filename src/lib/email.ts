import { Resend } from 'resend';
import { render } from '@react-email/render';

import { env } from '@/env';
import { InvitationEmail } from '@/components/emails/InvitationEmail';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendInvitationEmail({
  email,
  invitedByName,
  organizationName,
  role,
  invitationId,
}: {
  email: string;
  invitedByName: string;
  organizationName: string;
  role: string;
  invitationId: string;
}) {
  const inviteLink = `${env.NEXT_PUBLIC_APP_URL}/accept-invitation/${invitationId}`;

  try {
    const emailHtml = await render(
      InvitationEmail({
        invitedByName,
        organizationName,
        inviteLink,
        role,
      })
    );

    const result = await resend.emails.send({
      from: 'Kabeiri <noreply@kabeiri.com>', // Update this to your verified domain
      to: email,
      subject: `You're invited to join ${organizationName}`,
      html: emailHtml,
    });

    console.log('Invitation email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send invitation email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail({
  email,
  name,
  organizationName,
}: {
  email: string;
  name: string;
  organizationName: string;
}) {
  try {
    const result = await resend.emails.send({
      from: 'Kabeiri <noreply@kabeiri.com>', // Update this to your verified domain
      to: email,
      subject: `Welcome to ${organizationName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to ${organizationName}!</h1>
          <p>Hi ${name},</p>
          <p>Welcome to your new Kabeiri automotive service management dashboard!</p>
          <p>You can now access all the tools you need to manage your automotive service business efficiently.</p>
          <p>Best regards,<br>The Kabeiri Team</p>
        </div>
      `,
    });

    console.log('Welcome email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}
