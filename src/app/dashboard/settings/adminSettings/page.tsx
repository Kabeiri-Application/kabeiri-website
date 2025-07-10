import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Card, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

import SettingPage from "../components/settingPage";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.role || session.user.role !== "admin") {
    redirect("/error");
  }

  return (
    <SettingPage title="Admin Settings">
      <Link href="/dashboard/settings/adminSettings/manageUsers" passHref>
        <Card className="hover:bg-accent mt-2 w-lg cursor-pointer rounded-lg p-6 shadow transition">
          <CardTitle>Manage Users</CardTitle>
        </Card>
      </Link>
    </SettingPage>
  );
}
