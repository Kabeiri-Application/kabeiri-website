import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import SettingsCard from "./components/settings-card";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session);

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

        {session?.user?.role === "admin" && (
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
