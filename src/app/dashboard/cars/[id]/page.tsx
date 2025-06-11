"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeftIcon, PencilIcon } from "lucide-react";

import { getCar } from "@/app/dashboard/cars/actions";
import { Button } from "@/components/ui/button";
import { Car } from "@/db/app.schema";

// import { Button } from "@/components/ui/button";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const carId = typeof params.id === "string" ? params.id : "";

  const [car, setCar] = useState<Car>();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      if (!carId) {
        throw new Error("Car ID not found");
      }
      const car = await getCar(carId);
      if (!car) {
        throw new Error("Failed to fetch car data");
      }
      setCar(car);
    } catch (error) {
      console.error("Failed to fetch car data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
          <button
            onClick={() => router.back()}
            className="hover:text-primary flex cursor-pointer items-center"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Customer
          </button>
          <Button className="flex items-center">
            <PencilIcon className="size-4" />
            Edit
          </Button>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Vehicle Details</h1>
        </div>
        {loading ? (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="border-t-primary flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent text-4xl" />
          </div>
        ) : !car ? (
          <div className="text-center text-red-500">
            <p>Car not found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold">Vehicle Info</h2>
              <div className="space-y-2">
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
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold">Vehicle Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Color: </span>
                  {car.color}
                </p>
                <p>
                  <span className="font-medium">Miles: </span>
                  {car.miles}
                </p>
                <p>
                  <span className="font-medium">Liscense Plate: </span>
                  {car.licensePlate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
