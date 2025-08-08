import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import type { Role } from "@/lib/authz";

import SettingsCard from "./components/settings-card";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session);

  // Get role from Better Auth organization member instead of user role
  // The user's role in an organization is stored in the member table
  let userRole: Role | undefined;
  let hasAdminAccess = false;

  try {
    // Get the user's active member information from Better Auth
    const activeMember = await auth.api.getActiveMember({
      headers: await headers(),
    });
    console.log("Active member:", activeMember);

    if (activeMember?.role) {
      // Better Auth organization roles can be a string or array
      const memberRole = Array.isArray(activeMember.role)
        ? activeMember.role[0]
        : activeMember.role;

      userRole = memberRole as Role;
      console.log("User role from Better Auth organization member:", userRole);

      // Check if user has admin access based on Better Auth organization role
      hasAdminAccess = userRole === "admin" || userRole === "owner";
    } else {
      console.log("No active member found or no role assigned");
    }
  } catch (error) {
    console.error("Error getting active member:", error);
    // Fallback: if no organization membership, user has no admin access
    hasAdminAccess = false;
  }

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <SettingsCard
          title="Account"
          description="Update your profile information, change your password, and manage your account preferences."
          href="/dashboard/settings/accountSettings"
        />

        {/* Show admin settings only for users with proper permissions */}
        {hasAdminAccess && (
          <SettingsCard
            title="Admin"
            description="Manage users, view logs, and configure application settings."
            href="/dashboard/settings/adminSettings"
          />
        )}

        <SettingsCard
          title="Privacy and Security"
          description="Update your accounts security and privacy preferences."
          href="/dashboard/settings/privacySettings"
        />

        <SettingsCard
          title="Accessibility"
          description="Update your accessibility preferences."
          href="/dashboard/settings/accessibilitySettings"
        />

        <SettingsCard
          title="About"
          description="Learn more about this application, its features, and Kabeiri."
          href="/dashboard/settings/about"
        />
      </div>
    </main>
  );
}
