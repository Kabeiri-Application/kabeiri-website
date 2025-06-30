import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SettingPage from "../components/settingPage";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session?.user?.role);

  if (!session?.user?.role || session.user.role !== "admin") {
    redirect("/error");
  }

  return (
    <SettingPage title="Admin Settings">
      <p>Admin settings will be implemented here.</p>
    </SettingPage>
  );
}
