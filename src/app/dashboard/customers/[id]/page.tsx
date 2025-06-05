"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeftIcon, PencilIcon, PlusIcon } from "lucide-react";

import { getCars, getCustomer } from "@/app/dashboard/customers/actions";
import AddVehicleModal from "@/app/dashboard/customers/components/add-vehicle-modal";
import EditCustomerModal from "@/app/dashboard/customers/components/edit-customer-modal";
import { Button } from "@/components/ui/button";
import type { Car, Customer } from "@/db/app.schema";

import CarListItem from "../components/car-list-item";

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

          {/* Vehicle Information */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Customer Vehicles</h2>
            <div className="space-y-2">
              {cars.length > 0 ? (
                cars.map((car) => (
                  <div key={car.id} className="border-b border-gray-200 pb-2">
                    <p>
                      <span className="font-medium">Make: </span>
                      {car.make}
                    </p>
                    <p>
                      <span className="font-medium">Model: </span>
                      {car.model}
                    </p>
                    <p>
                      <span className="font-medium">Year: </span>
                      {car.year}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No vehicles found for this customer.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <EditCustomerModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        customerId={customerId}
        fetchData={fetchData}
        customer={customer}
      />
      <AddVehicleModal
        addVehicleModal={addVehicleModal}
        setAddVehicleModal={setAddVehicleModal}
        customerId={customerId}
      />
    </main>
  );
}
