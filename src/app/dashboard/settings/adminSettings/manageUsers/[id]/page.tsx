import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Profile, profilesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";

interface UserPageProps {
  params: { id: string };
}

async function updateUser(formData: FormData, userId: string) {
  "use server";
  const session = await auth.api.getSession({ headers: await headers() });
  if (
    !session?.user?.role ||
    (session.user.role !== "admin" && session.user.role !== "owner")
  ) {
    throw new Error("Unauthorized");
  }
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;
  const role = formData.get("role") as "admin" | "owner" | "user";
  const phone = formData.get("phone") as string;

  await db
    .update(profilesTable)
    .set({ firstName, lastName, username, role, phone })
    .where(eq(profilesTable.id, userId));

  revalidatePath(`/dashboard/settings/adminSettings/manageUsers/${userId}`);
}

export default async function UserPage({ params }: UserPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (
    !session?.user?.role ||
    (session.user.role !== "admin" && session.user.role !== "owner")
  ) {
    redirect("/error");
  }

  const user: Profile | undefined = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, params.id),
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">User Details</h1>
        <div className="mb-6 rounded-lg border bg-white p-6 shadow">
          <div className="mb-4">
            <span className="font-semibold">Name:</span> {user.firstName}{" "}
            {user.lastName}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Username:</span> {user.username}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Role:</span> {user.role}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Phone:</span> {user.phone}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Address:</span> {user.streetAddress}
            , {user.city}, {user.state} {user.zipCode}
          </div>
        </div>
        {(session.user.role === "admin" || session.user.role === "owner") && (
          <form
            action={async (formData) => {
              "use server";
              await updateUser(formData, user.id);
              redirect(
                `/dashboard/settings/adminSettings/manageUsers/${user.id}`,
              );
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                name="firstName"
                defaultValue={user.firstName}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                name="lastName"
                defaultValue={user.lastName}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                name="username"
                defaultValue={user.username}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                defaultValue={user.role}
                className="mt-1 block w-full rounded border px-3 py-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                defaultValue={user.phone}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
