"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { editCustomer, getCustomer } from "@/app/dashboard/customers/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Profile } from "@/db/app.schema";

import { customerFormSchema } from "../schema";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Profile>();
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const customerId = typeof params.id === "string" ? params.id : "";

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!customerId) {
        throw new Error("Service ID not found");
      }
      const customer = await getCustomer(customerId);
      if (!customer) {
        throw new Error("Failed to fetch data");
      }
      setCustomer(customer);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });
  const onSubmit: SubmitHandler<customerFormSchema> = (data) => {
    console.log("Form data:", data);
    editCustomer(data, customerId);
    setModalStatus(false);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }
  return (
    <main className="p-8">
      <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
        <button
          onClick={() => router.back()}
          className="hover:text-primary flex items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Customers
        </button>
        <button
          onClick={() => setModalStatus(true)}
          className="hover:text-primary flex items-center"
        >
          <PencilIcon className="size-4" />
          Edit
        </button>
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {customer?.firstName + " " + customer?.lastName}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Customer Information */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Customer Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name: </span>
                {customer?.firstName} {customer?.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <DialogContent className="max-h-full overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900">
              Create a Customer
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
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

            <Button
              type="submit"
              className="my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
