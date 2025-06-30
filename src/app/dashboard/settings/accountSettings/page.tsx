import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import SettingPage from "../components/settingPage";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session?.user?.role);
  return (
    <SettingPage title="Account Settings">
      <p className="text-gray-600">
        Update your profile information, change your password, and manage your
        account preferences.
      </p>

      <div className="mt-4">
        <a
          href="/dashboard/settings/accountSettings/password"
          className="text-blue-600 hover:underline"
        >
          Change Password
        </a>
      </div>
    </SettingPage>
  );
}
