"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { getOrganizationId, getServices } from "@/app/dashboard/jobs/actions";
import ServiceCard from "@/app/dashboard/services/_components/ServiceCard";
import { createService } from "@/app/dashboard/services/actions";
import { serviceFormSchema } from "@/app/dashboard/services/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { NewService, Service } from "@/db/app.schema";

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const [organizationId, setOrganizationId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewService>({
    resolver: zodResolver(serviceFormSchema),
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const organizationId = await getOrganizationId();
      if (!organizationId) {
        throw new Error("Organization ID not found");
      }
      if (organizationId) {
        setOrganizationId(organizationId);
      }
      const services = await getServices(organizationId);
      if (!services) {
        throw new Error("Failed to fetch data");
      }
      setServices(services);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<NewService> = (data) => {
    console.log("Form data:", data);
    createService(data, organizationId);
    setModalStatus(false);
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="p-8">
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Auto Services</h1>
            <DialogTrigger className="flex flex-row items-center rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800">
              <PlusIcon className="mr-2 size-5" />
              New Service
            </DialogTrigger>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
        <DialogContent className="max-h-full overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900">
              Create a Service
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register("title")}
                placeholder="Title"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                {...register("description")}
                placeholder="Description"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                min={0.0}
                step={0.01}
                {...register("price")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.price && (
                <span className="text-sm text-red-500">
                  {errors.price.message}
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
