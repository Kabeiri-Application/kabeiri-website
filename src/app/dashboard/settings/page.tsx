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
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
          <p className="text-muted-foreground mb-2">
            Update your profile information, change your password, and manage
            your account preferences.
          </p>
          <form>
            <div className="mt-6">
              <label className="block text-sm font-medium">Email</label>
              <input
                defaultValue={session?.user?.email || ""}
                // {...register("make")}
                placeholder="Email"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {/* {errors.make && (
              <span className="text-sm text-red-500">
                {errors.make.message}
              </span>
            )} */}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium">Name</label>
              <input
                defaultValue={session?.user?.name || ""}
                placeholder="Name"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {/* {errors.model && (
              <span className="text-sm text-red-500">
                {errors.model.message}
              </span>
            )} */}
            </div>
            <Button className="mt-4">Update Profile</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
