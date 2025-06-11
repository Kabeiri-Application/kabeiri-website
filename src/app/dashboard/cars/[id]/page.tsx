"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { editCar, getCar } from "@/app/dashboard/cars/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Car } from "@/db/app.schema";

import { carFormSchema } from "../schema";

// import { Button } from "@/components/ui/button";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const carId = typeof params.id === "string" ? params.id : "";

  const [car, setCar] = useState<Car>();
  const [loading, setLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<carFormSchema>({
    resolver: zodResolver(carFormSchema),
  });

  const onSubmit: SubmitHandler<carFormSchema> = (data) => {
    console.log("Form data:", data);
    editCar(carId, { ...data });
    setModalStatus(false);
    fetchData();
  };

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
          <Button
            onClick={() => setModalStatus(true)}
            className="flex items-center"
          >
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
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <DialogContent className="max-h-full overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Edit Car</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Make</label>
              <input
                defaultValue={car?.make}
                {...register("make")}
                placeholder="Make"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.make && (
                <span className="text-sm text-red-500">
                  {errors.make.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Model</label>
              <input
                defaultValue={car?.model}
                {...register("model")}
                placeholder="Model"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.model && (
                <span className="text-sm text-red-500">
                  {errors.model.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Year</label>
              <input
                defaultValue={car?.year}
                {...register("year")}
                placeholder="Year"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.year && (
                <span className="text-sm text-red-500">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Color</label>
              <input
                defaultValue={car?.color}
                {...register("color")}
                placeholder="Color"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.color && (
                <span className="text-sm text-red-500">
                  {errors.color.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Miles</label>
              <input
                defaultValue={String(car?.miles)}
                {...register("miles")}
                placeholder="Miles"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.miles && (
                <span className="text-sm text-red-500">
                  {errors.miles.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Liscense Plate
              </label>
              <input
                defaultValue={car?.licensePlate}
                {...register("licensePlate")}
                placeholder="Liscense Plate"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.licensePlate && (
                <span className="text-sm text-red-500">
                  {errors.licensePlate.message}
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
