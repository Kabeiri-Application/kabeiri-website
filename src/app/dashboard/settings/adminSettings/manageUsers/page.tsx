import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.role || session.user.role !== "admin") {
    redirect("/error");
  }

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">Manage Users</h1>
          <Link href="/dashboard/settings/adminSettings/addUser" passHref>
            <Button className="flex flex-row items-center rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800">
              <PlusIcon className="mr-2 size-5" />
              New Customer
            </Button>
          </Link>
        </div>

        <p className="mb-4">Here you can manage all users in the system.</p>
        {/* Add user management components here */}
        <p className="text-gray-500">
          User management functionality will be implemented here.
        </p>
      </div>
    </main>
  );
}
