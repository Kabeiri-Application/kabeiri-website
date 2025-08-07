import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import type { Role } from "@/lib/authz";

import {
  getOrganization,
  getOrganizationUsers,
  transferOwnership,
  updateOrganization,
} from "../actions";
import { updateOrganizationFormSchema } from "../schema";

export default async function OrganizationPage() {
  // Check authorization using Better Auth organization member role
  let hasAdminAccess = false;
  let isOwner = false;

  try {
    // Get the user's active member information from Better Auth
    const activeMember = await auth.api.getActiveMember({
      headers: await headers(),
    });

    if (activeMember?.role) {
      // Better Auth organization roles can be a string or array
      const memberRole = Array.isArray(activeMember.role)
        ? activeMember.role[0]
        : activeMember.role;

      const userRole = memberRole as Role;

      // Check if user has admin access based on Better Auth organization role
      hasAdminAccess = userRole === "admin" || userRole === "owner";
      isOwner = userRole === "owner";
    }
  } catch (error) {
    console.error("Error getting active member:", error);
    hasAdminAccess = false;
    isOwner = false;
  }

  // Redirect if no admin access
  if (!hasAdminAccess) {
    redirect("/dashboard?error=unauthorized");
  }

  const organization = await getOrganization();
  const users = await getOrganizationUsers();
  const owners = users.filter((user) => user.role === "owner");

  async function handleUpdateOrganization(formData: FormData) {
    "use server";

    const data = {
      name: formData.get("name") as string,
      businessName: formData.get("businessName") as string,
      streetAddress: formData.get("streetAddress") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
    };

    const result = updateOrganizationFormSchema.safeParse(data);
    if (!result.success) {
      // Handle validation errors
      return;
    }

    const response = await updateOrganization(result.data);
    if (response.success) {
      revalidatePath("/dashboard/settings/adminSettings/organization");
    }
  }

  async function handleTransferOwnership(formData: FormData) {
    "use server";

    const targetUserId = formData.get("targetUserId") as string;
    const response = await transferOwnership(targetUserId);

    if (response.success) {
      revalidatePath("/dashboard/settings/adminSettings/organization");
    }
  }

  if (!organization) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 dark:text-red-400">Organization not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="mb-6">
          <Link
            href="/dashboard/settings/adminSettings"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Back to Admin Settings
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Organization Settings
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your organization information and settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
            <CardDescription>
              Update your organization&apos;s basic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleUpdateOrganization} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={organization.name}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    defaultValue={organization.businessName || ""}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  defaultValue={organization.streetAddress || ""}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={organization.city || ""}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    defaultValue={organization.state || ""}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    defaultValue={organization.zipCode || ""}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={organization.phone || ""}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://example.com"
                    defaultValue={organization.website || ""}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isOwner && (
          <Card>
            <CardHeader>
              <CardTitle>Ownership Transfer</CardTitle>
              <CardDescription>
                Transfer ownership of this organization to another user
              </CardDescription>
            </CardHeader>
            <CardContent>
              {owners.length > 1 ? (
                <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                  <p className="text-amber-700 dark:text-amber-300">
                    Multiple owners detected. Please contact support for
                    ownership management.
                  </p>
                </div>
              ) : (
                <form action={handleTransferOwnership} className="space-y-4">
                  <div>
                    <Label htmlFor="targetUserId">Select New Owner</Label>
                    <select
                      id="targetUserId"
                      name="targetUserId"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                      <option value="">Choose a user...</option>
                      {users
                        .filter((user) => user.role !== "owner")
                        .map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName} ({user.username}) -{" "}
                            {user.role}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      <strong>Warning:</strong> This action cannot be undone.
                      You will lose owner privileges and become an admin.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="destructive">
                      Transfer Ownership
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
