import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { addVehicle } from "@/app/dashboard/customers/actions";
import { addVehicleFormSchema } from "@/app/dashboard/customers/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddVehicleModalProps {
  addVehicleModal: boolean;
  setAddVehicleModal: (open: boolean) => void;
  customerId: string;
}

export default function AddVehicleModal({
  addVehicleModal,
  setAddVehicleModal,
  customerId,
}: AddVehicleModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addVehicleFormSchema>({
    resolver: zodResolver(addVehicleFormSchema),
  });

  const onSubmit: SubmitHandler<addVehicleFormSchema> = (data) => {
    console.log("Form data:", data);
    addVehicle({ ...data, owner: customerId });
    setAddVehicleModal(false);
  };
  return (
    <Dialog open={addVehicleModal} onOpenChange={setAddVehicleModal}>
      <DialogContent className="max-h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Add Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Vehicle Make</label>
            <input
              {...register("make")}
              placeholder="Vehicle Make"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.make && (
              <span className="text-sm text-red-500">
                {errors.make.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Model</label>
            <input
              {...register("model")}
              placeholder="Vehicle Model"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.model && (
              <span className="text-sm text-red-500">
                {errors.model.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Year</label>
            <input
              {...register("year")}
              placeholder="Vehicle Year"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.year && (
              <span className="text-sm text-red-500">
                {errors.year.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle VIN</label>
            <input
              {...register("vin")}
              placeholder="Vehicle VIN"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.vin && (
              <span className="text-sm text-red-500">{errors.vin.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">License Plate</label>
            <input
              {...register("licensePlate")}
              placeholder="License Plate"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.licensePlate && (
              <span className="text-sm text-red-500">
                {errors.licensePlate.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Color</label>
            <input
              {...register("color")}
              placeholder="Vehicle Color"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.color && (
              <span className="text-sm text-red-500">
                {errors.color.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Miles</label>
            <input
              {...register("miles")}
              placeholder="Vehicle Miles"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.miles && (
              <span className="text-sm text-red-500">
                {errors.miles.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800"
          >
            Add Vehicle
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
