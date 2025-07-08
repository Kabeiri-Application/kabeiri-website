import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import SettingPage from "../components/settingPage";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session?.user?.role);
  return (
    <SettingPage title="Accessibility Settings">
      <p>Accessibility settings will be implemented here.</p>
    </SettingPage>
  );
}
