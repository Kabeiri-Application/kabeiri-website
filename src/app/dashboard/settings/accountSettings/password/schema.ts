import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .max(64, "New password must be at most 64 characters long")
      .regex(/[a-z]/, "New password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
      .regex(/[0-9]/, "New password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "New password must contain at least one special character",
      ),
    confirmNewPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .max(64, "New password must be at most 64 characters long")
      .regex(/[a-z]/, "New password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
      .regex(/[0-9]/, "New password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "New password must contain at least one special character",
      ),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmNewPassword"],
  });

export type changePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
