import { z } from "zod";

/** Honeypot — must stay empty; stripped before DB insert */
const honeypotField = {
  website: z.string().optional(),
};

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number format"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  ...honeypotField,
});

export const admissionFormSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  parentName: z.string().min(2, "Parent name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number format"),
  program: z.string().min(1, "Please select a program"),
  age: z.string().optional(),
  message: z.string().optional(),
  ...honeypotField,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AdmissionFormData = z.infer<typeof admissionFormSchema>;
