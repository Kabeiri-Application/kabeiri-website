import { Milestone } from "lucide-react";
import { z } from "zod";

export const customerFormSchema = z.object({
  firstName: z.string().min(1, "Title must be at least 1 characters"),
  lastName: z.string().min(1, "Title must be at least 1 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").optional(),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

export type customerFormSchema = z.infer<typeof customerFormSchema>;

export const addVehicleFormSchema = z.object({
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.string().min(1, "Vehicle year is required"),
  vin: z.string(),
  licensePlate: z.string().min(1, "Vehicle license plate is required"),
  color: z.string().min(1, "Vehicle color is required"),
  miles: z.string().min(1, "Vehicle miles is required"),
});

export type addVehicleFormSchema = z.infer<typeof addVehicleFormSchema>;
