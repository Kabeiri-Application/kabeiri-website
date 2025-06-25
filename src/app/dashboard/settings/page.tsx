import { headers } from "next/headers";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session);
  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <div className="mt-2 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
          <p className="text-muted-foreground mb-2">
            Update your profile information, change your password, and manage
            your account preferences.
          </p>
          <Button>Update Account</Button>
        </div>

        <div className="mt-2 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Privacy and Security</h2>
          <p className="text-muted-foreground mb-2">
            Update your accounts security and privacy preferences.
          </p>
          <Button>Update Security</Button>
        </div>

        <div className="mt-2 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Accessability</h2>
          <p className="text-muted-foreground mb-2">
            Update your accessability preferences.
          </p>
          <Button>Update Accessability</Button>
        </div>
      </div>
    </main>
  );
}
