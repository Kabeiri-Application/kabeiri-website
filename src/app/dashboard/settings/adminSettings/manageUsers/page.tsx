import { redirect } from "next/navigation";

import { requirePermission } from "@/lib/authz";

import { UserManagementClient } from "../_components/UserManagementClient";
import { getOrganizationUsers } from "../actions";

export default async function ManageUsersPage() {
  // Check authorization
  try {
    await requirePermission("USER_READ");
  } catch {
    redirect("/dashboard?error=unauthorized");
  }

  const users = await getOrganizationUsers();

  return <UserManagementClient initialUsers={users} />;
}
