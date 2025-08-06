import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { createJob, getVehicles } from "@/app/dashboard/jobs/actions";
import { jobFormSchema } from "@/app/dashboard/jobs/schema";
import type { Car } from "@/db/app.schema";

import type { JobFormData } from "../_types/job.types";

export function useJobForm(onSuccess?: () => void) {
  const [modalStatus, setModalStatus] = useState(false);
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      customer: "",
      vehicle: "",
      service: "",
      due_date: "",
      assigned_to: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = form;

  const watchedCustomer = watch("customer");

  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    try {
      // Convert string date to Date object for createJob
      const jobData = {
        ...data,
        due_date: new Date(data.due_date),
      };
      await createJob(jobData);
      reset();
      setModalStatus(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const fetchCars = async (customerId: string) => {
    if (!customerId) {
      setVehicles([]);
      return;
    }
    try {
      const carsData = await getVehicles(customerId);
      setVehicles(carsData as Car[]);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setVehicles([]);
    }
  };

  const openModal = () => {
    setModalStatus(true);
    // Don't fetch cars here - wait for customer selection
  };

  const closeModal = () => {
    setModalStatus(false);
    reset();
    setSelectedCustomer("");
  };

  // Watch for customer changes to fetch vehicles
  useEffect(() => {
    if (watchedCustomer) {
      void fetchCars(watchedCustomer);
    } else {
      setVehicles([]);
    }
  }, [watchedCustomer]);

  return {
    modalStatus,
    vehicles,
    selectedCustomer,
    watchedCustomer,
    form,
    register,
    errors,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    setSelectedCustomer,
  };
}
