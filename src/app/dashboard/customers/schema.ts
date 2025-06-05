import { z } from "zod";

export const customerFormSchema = z.object({
  firstName: z.string().min(1, "Title must be at least 1 characters"),
  lastName: z.string().min(1, "Title must be at least 1 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

export type customerFormSchema = z.infer<typeof customerFormSchema>;
