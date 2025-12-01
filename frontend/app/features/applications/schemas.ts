import { z } from "zod";

export const applicationSchema = z.object({
  applicant_name: z
    .string()
    .min(1, "Applicant name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  applicant_email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  permit_type: z
    .string()
    .min(1, "Permit type is required")
    .min(3, "Permit type must be at least 3 characters")
    .max(100, "Permit type must not exceed 100 characters"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
