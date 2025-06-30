import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import SettingPage from "../components/settingPage";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session?.user?.role);
  return (
    <SettingPage title="Privacy and Security Settings">
      <p>Privacy and security settings will be implemented here.</p>
    </SettingPage>
  );
}
