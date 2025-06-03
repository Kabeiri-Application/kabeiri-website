import { z } from "zod";

export const customerFormSchema = z.object({
  firstName: z.string().min(1, "Title must be at least 1 characters"),
  lastName: z.string().min(1, "Title must be at least 1 characters"),
});

export type customerFormSchema = z.infer<typeof customerFormSchema>;
