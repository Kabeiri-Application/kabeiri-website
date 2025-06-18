import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { editCustomer } from "@/app/dashboard/customers/actions";
import { customerFormSchema } from "@/app/dashboard/customers/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Customer } from "@/db/app.schema";

interface EditCustomerModalProps {
  modalStatus: boolean;
  setModalStatus: (open: boolean) => void;
  customerId: string;
  fetchData: () => void;
  customer: Customer | undefined;
}

export default function EditCustomerModal({
  modalStatus,
  setModalStatus,
  customerId,
  fetchData,
  customer,
}: EditCustomerModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  const onSubmit: SubmitHandler<customerFormSchema> = (data) => {
    console.log("Form data:", data);
    editCustomer({ ...data, id: customerId });
    setModalStatus(false);
    fetchData();
  };

  return (
    <Dialog open={modalStatus} onOpenChange={setModalStatus}>
      <DialogContent className="max-h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Edit Customer
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              defaultValue={customer?.firstName}
              {...register("firstName")}
              placeholder="First Name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              defaultValue={customer?.lastName}
              {...register("lastName")}
              placeholder="Last Name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              defaultValue={customer?.phoneNumber}
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.phoneNumber && (
              <span className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              defaultValue={customer?.email ?? ""}
              {...register("email")}
              placeholder="Email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Street Address</label>
            <input
              defaultValue={customer?.streetAddress}
              {...register("streetAddress")}
              placeholder="Street Address"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.streetAddress && (
              <span className="text-sm text-red-500">
                {errors.streetAddress.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              defaultValue={customer?.city}
              {...register("city")}
              placeholder="City"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.city && (
              <span className="text-sm text-red-500">
                {errors.city.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              defaultValue={customer?.state}
              {...register("state")}
              placeholder="State"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.state && (
              <span className="text-sm text-red-500">
                {errors.state.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Zip Code</label>
            <input
              defaultValue={customer?.zipCode}
              {...register("zipCode")}
              placeholder="Zip Code"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.zipCode && (
              <span className="text-sm text-red-500">
                {errors.zipCode.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
