import { useRouter } from "next/navigation";

import { UserIcon } from "lucide-react";

import { Profile } from "@/db/app.schema";

export function CustomerCard(customer: Profile) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
      className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-4 hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-gray-100">
          <UserIcon className="size-4 text-gray-600" />
        </div>
        <span className="font-medium text-gray-900">
          {customer.firstName} {customer.lastName}
        </span>
      </div>
      <div className="text-sm text-gray-500">{customer.phone}</div>
    </div>
  );
}
