import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeftIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Profile } from "@/db/app.schema";
import { auth } from "@/lib/auth";

import { getOrganizationUsers } from "../actions";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.role || session.user.role !== "admin") {
    redirect("/error");
  }

  const users: Profile[] = await getOrganizationUsers();

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard/settings/adminSettings"
          className="hover:text-primary mb-8 flex cursor-pointer items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Admin Settings
        </Link>
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
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <Link
                  key={user.id}
                  href={`/dashboard/settings/adminSettings/manageUsers/${user.id}`}
                  passHref
                  legacyBehavior
                >
                  <tr
                    className="cursor-pointer transition hover:bg-gray-100"
                    tabIndex={0}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {user.role}
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
