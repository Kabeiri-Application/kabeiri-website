"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  editCustomer,
  getCars,
  getCustomer,
} from "@/app/dashboard/customers/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Car, Customer } from "@/db/app.schema";

import AddVehicleModal from "../components/add-vehicle-modal";
import CarListItem from "../components/car-list-item";
import { customerFormSchema } from "../schema";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>();
  const [cars, setCars] = useState<Car[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [addVehicleModal, setAddVehicleModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const customerId = typeof params.id === "string" ? params.id : "";

  const fetchData = async () => {
    try {
      setLoading(true);
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

  const fetchCars = async () => {
    try {
      if (!customerId) {
        throw new Error("Customer ID not found");
      }
      const cars = await getCars(customerId);
      if (!cars) {
        throw new Error("Failed to fetch cars for the customer");
      }
      setCars(cars);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (customer) {
      fetchCars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, addVehicleModal]);

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
          className="hover:text-primary flex cursor-pointer items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Customers
        </button>
        <Button
          onClick={() => setModalStatus(true)}
          className="flex items-center"
        >
          <PencilIcon className="size-4" />
          Edit
        </Button>
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
              <p>
                <span className="font-medium">Phone Number: </span>
                {customer?.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {customer?.email ?? "N/A"}
              </p>
              <p>
                <span className="font-medium">Address: </span>
                {customer?.streetAddress} {customer?.city},{" "}
                {customer?.state.toUpperCase()} {customer?.zipCode}
              </p>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="mb-4 text-xl font-semibold">Customer Vehicles</h2>
              <Button
                onClick={() => setAddVehicleModal(true)}
                className="flex items-center"
              >
                <PlusIcon className="size-4" />
                <span className="text-sm">Add Vehicle</span>
              </Button>
            </div>

            <div className="space-y-2">
              {cars.length > 0 ? (
                cars.map((car) => <CarListItem key={car.id} {...car} />)
              ) : (
                <p className="text-gray-500">
                  No vehicles found for this customer.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
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
              <label className="block text-sm font-medium">
                Street Address
              </label>
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
      <AddVehicleModal
        addVehicleModal={addVehicleModal}
        setAddVehicleModal={setAddVehicleModal}
        customerId={customerId}
      />
    </main>
  );
}
