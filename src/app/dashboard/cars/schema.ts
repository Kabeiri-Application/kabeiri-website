import { z } from "zod";

export const carFormSchema = z.object({
  make: z.string().min(1, "Make must be at least 1 characters"),
  model: z.string().min(1, "Model must be at least 1 characters"),
  year: z.string().min(1, "Year is required"),
  color: z.string(),
  miles: z.string(),
  licensePlate: z.string().min(1, "License plate is required"),
});

export type carFormSchema = z.infer<typeof carFormSchema>;
