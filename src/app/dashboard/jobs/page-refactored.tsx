"use client";

import React from "react";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { DialogTrigger } from "@/components/ui/dialog";

import { JobFilters, JobFormDialog, JobTable } from "./_components";
import { useJobFilters } from "./_hooks/use-job-filters";
import { useJobForm } from "./_hooks/use-job-form";
import { useJobsData } from "./_hooks/use-jobs-data";

export default function JobsPage() {
  const { data, isLoading, error, refetch } = useJobsData();
  const { filters, updateFilter, clearFilters, hasActiveFilters } =
    useJobFilters();
  const {
    modalStatus,
    vehicles,
    selectedCustomer,
    watchedCustomer,
    register,
    errors,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    setSelectedCustomer,
  } = useJobForm(refetch);

  if (isLoading) {
    return (
      <main className="p-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600 dark:text-gray-400">
            Loading jobs...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <div className="text-center text-red-600 dark:text-red-400">
          Error loading jobs: {error}
        </div>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Jobs
        </h1>
        <DialogTrigger asChild>
          <InteractiveHoverButton onClick={openModal}>
            New Job
          </InteractiveHoverButton>
        </DialogTrigger>
      </div>

      <JobFilters
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters()}
      />

      <JobTable jobs={data.jobs} />

      <JobFormDialog
        isOpen={modalStatus}
        onClose={closeModal}
        customers={data.customers}
        employees={data.employees}
        services={data.services}
        vehicles={vehicles}
        selectedCustomer={selectedCustomer}
        watchedCustomer={watchedCustomer}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        register={register}
        errors={errors}
        setSelectedCustomer={setSelectedCustomer}
      />
    </main>
  );
}
