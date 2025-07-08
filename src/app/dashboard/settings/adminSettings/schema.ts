import { z } from "zod";

export const addUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(254, "Email must be at most 254 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long"),
  role: z.enum(["admin", "user"]),
});

export type addUserFormSchema = z.infer<typeof addUserFormSchema>;
