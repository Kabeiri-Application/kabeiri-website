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

export const changeEmailFormSchema = z
  .object({
    currentEmail: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long")
      .max(254, "Email must be at most 254 characters long"),
    newEmail: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long")
      .max(254, "Email must be at most 254 characters long"),
    confirmNewEmail: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long")
      .max(254, "Email must be at most 254 characters long"),
  })
  .refine((data) => data.newEmail === data.confirmNewEmail, {
    message: "New email and confirmation do not match",
    path: ["confirmNewEmail"],
  });

export type changePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
export type changeEmailFormSchema = z.infer<typeof changeEmailFormSchema>;
