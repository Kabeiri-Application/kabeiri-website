"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { editService, getService } from "@/app/dashboard/services/actions";
import { serviceFormSchema } from "@/app/dashboard/services/schema";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Service } from "@/db/app.schema";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service>();
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const serviceId = typeof params.id === "string" ? params.id : "";

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!serviceId) {
        throw new Error("Service ID not found");
      }
      const service = await getService(serviceId);
      if (!service) {
        throw new Error("Failed to fetch data");
      }
      setService(service);
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
  } = useForm<serviceFormSchema>({
    resolver: zodResolver(serviceFormSchema),
  });
  const onSubmit: SubmitHandler<serviceFormSchema> = (data) => {
    console.log("Form data:", data);
    editService(data, serviceId);
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
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="size-4" />
          Back to Services
        </button>
        <button
          onClick={() => setModalStatus(true)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Pencil className="size-4" />
          Edit
        </button>
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{service?.title}</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Service Information */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Service Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Title: </span>
                {service?.title}
              </p>
              <p>
                <span className="font-medium">Description: </span>
                {service?.description}
              </p>
              <p>
                <span className="font-medium">Price: </span>${service?.price}
              </p>
            </div>
          </div>

          {/* Timing Information */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Timing Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Created: </span>
                {service?.createdAt
                  ? new Date(service.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium">Last Updated: </span>
                {service?.updatedAt
                  ? new Date(service.updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
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
                defaultValue={service?.title}
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
                defaultValue={service?.description}
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
                defaultValue={service?.price}
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
