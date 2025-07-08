"use client";

import { useRouter } from "next/navigation";

import { Card, CardTitle } from "@/components/ui/card";

import SettingPage from "../components/settingPage";

export default function Page() {
  const router = useRouter();

  return (
    <SettingPage title="Account Settings">
      <p className="text-gray-600">
        Update your profile information, change your password, and manage your
        account preferences.
      </p>
      <Card
        onClick={() => router.push("/dashboard/settings/accountSettings/email")}
        className="hover:bg-accent mt-2 w-lg cursor-pointer rounded-lg p-6 shadow transition"
      >
        <CardTitle>Change Email</CardTitle>
      </Card>
      <Card
        onClick={() =>
          router.push("/dashboard/settings/accountSettings/password")
        }
        className="hover:bg-accent mt-2 w-lg cursor-pointer rounded-lg p-6 shadow transition"
      >
        <CardTitle>Change Password</CardTitle>
      </Card>
    </SettingPage>
  );
}
