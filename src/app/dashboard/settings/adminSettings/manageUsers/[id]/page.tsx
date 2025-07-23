import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

import { ArrowLeftIcon, UserIcon, ShieldIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { requirePermission, can, getAuthContext } from "@/lib/authz";

import { getUserById, updateUser, changeUserRole } from "../../actions";
import { updateUserFormSchema } from "../../schema";
import { DeleteUserButton } from "../../_components/DeleteUserButton";

interface UserPageProps {
  params: { id: string };
}

export default async function UserDetailPage({ params }: UserPageProps) {
  // Check authorization
  try {
    await requirePermission("USER_READ", params.id);
  } catch {
    redirect("/dashboard?error=unauthorized");
  }

  const user = await getUserById(params.id);
  const authContext = await getAuthContext();

  if (!user || !authContext) {
    notFound();
  }

  const canEditUser = can(authContext, "USER_UPDATE");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canChangeRole = can({ ...authContext, targetUserId: params.id, targetUserRole: user.role as any }, "USER_ROLE_CHANGE");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canDeleteUser = can({ ...authContext, targetUserId: params.id, targetUserRole: user.role as any }, "USER_DELETE");

  async function handleUpdateUser(formData: FormData) {
    "use server";
    
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      username: formData.get("username") as string,
      phone: formData.get("phone") as string,
      streetAddress: formData.get("streetAddress") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
    };

    const result = updateUserFormSchema.safeParse(data);
    if (!result.success) {
      // Handle validation errors
      return;
    }

    const response = await updateUser(params.id, result.data);
    if (response.success) {
      revalidatePath(`/dashboard/settings/adminSettings/manageUsers/${params.id}`);
    }
  }

  async function handleRoleChange(formData: FormData) {
    "use server";
    
    const newRole = formData.get("role") as "user" | "admin" | "owner";
    const response = await changeUserRole(params.id, newRole);
    
    if (response.success) {
      revalidatePath(`/dashboard/settings/adminSettings/manageUsers/${params.id}`);
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "owner":
        return "destructive";
      case "admin":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/dashboard/settings/adminSettings/manageUsers"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to User Management
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                @{user.username}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={getRoleBadgeVariant(user.role)}>
              {user.role}
            </Badge>
            {canDeleteUser && user.id !== authContext.userId && (
              <DeleteUserButton userId={user.id} />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Basic user details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {canEditUser ? (
              <form action={handleUpdateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      defaultValue={user.firstName}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      defaultValue={user.lastName}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={user.username}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={user.phone}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    defaultValue={user.streetAddress}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={user.city}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      defaultValue={user.state}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      defaultValue={user.zipCode}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.firstName}
                    </p>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.lastName}
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Username</Label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user.username}
                  </p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <Label>Address</Label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user.streetAddress && user.city && user.state
                      ? `${user.streetAddress}, ${user.city}, ${user.state} ${user.zipCode}`
                      : "Not provided"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ShieldIcon className="h-5 w-5" />
              <CardTitle>Role & Permissions</CardTitle>
            </div>
            <CardDescription>
              Manage user role and access levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            {canChangeRole ? (
              <form action={handleRoleChange} className="space-y-4">
                <div>
                  <Label htmlFor="role">User Role</Label>
                  <Select name="role" defaultValue={user.role}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    Update Role
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <Label>Current Role</Label>
                <div className="mt-2">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                Role Permissions
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {user.role === "owner" && (
                  <div>• Full system access and organization management</div>
                )}
                {(user.role === "admin" || user.role === "owner") && (
                  <div>• User management and settings access</div>
                )}
                <div>• Dashboard and job management access</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
