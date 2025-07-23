import { redirect } from "next/navigation";
import Link from "next/link";

import { UsersIcon, BuildingIcon, SettingsIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requirePermission } from "@/lib/authz";

export default async function AdminSettingsPage() {
  // Check authorization
  try {
    await requirePermission("ADMIN_SETTINGS_ACCESS");
  } catch {
    redirect("/dashboard?error=unauthorized");
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Settings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage users, organization settings, and system configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/settings/adminSettings/manageUsers">
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage users, roles, and permissions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add, edit, remove users and manage their access levels within your organization.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/adminSettings/organization">
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <BuildingIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Organization Settings
                  </CardTitle>
                  <CardDescription>
                    Configure organization details and preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update organization information, transfer ownership, and manage business settings.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-8">
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                <SettingsIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-gray-900 dark:text-white">
                  Administrator Privileges
                </CardTitle>
                <CardDescription>
                  You have administrator access to manage users and organization settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Important:</strong> Use these tools responsibly. Changes to user roles and organization settings can affect your entire team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
