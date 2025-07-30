import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface InvitationEmailProps {
  invitedByName: string;
  organizationName: string;
  inviteLink: string;
  role: string;
}

export function InvitationEmail({
  invitedByName,
  organizationName,
  inviteLink,
  role,
}: InvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re invited to join {organizationName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={title}>
              You&apos;re invited to join {organizationName}
            </Text>
            <Text style={text}>
              {invitedByName} has invited you to join {organizationName} as a{' '}
              <strong>{role}</strong>.
            </Text>
            <Button href={inviteLink} style={button}>
              Accept Invitation
            </Button>
            <Text style={text}>
              This invitation will expire in 7 days. If you have any questions,
              please contact your administrator.
            </Text>
            <Text style={footer}>
              Best regards,<br />
              The Kabeiri Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Email styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
  textAlign: 'center' as const,
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '16px',
  color: '#555',
};

const button = {
  backgroundColor: '#667eea',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  marginBottom: '24px',
  marginTop: '24px',
};

const footer = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#666',
  marginTop: '32px',
};
