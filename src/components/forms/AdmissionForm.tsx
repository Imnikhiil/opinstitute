"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionFormSchema, type AdmissionFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import {
  formatAdmissionWhatsAppMessage,
  openWhatsApp,
} from "@/lib/whatsapp";

const programs = [
  "OP Kids - Play Group",
  "OP Kids - Nursery",
  "OP Kids - LKG",
  "OP Kids - UKG",
  "CMA - Cost & Management Accountancy",
  "B.Com (Pass / Honours)",
  "School Tuition (Class I-VIII)",
  "Class IX & X",
  "Class XI & XII (Commerce)",
  "Other",
];

export function AdmissionForm({ className }: { className?: string }) {
  const siteConfig = useSiteConfig();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionFormSchema),
  });

  const onSubmit = async (data: AdmissionFormData) => {
    setSubmitError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("queries").insert({
        type: "admission",
        name: data.studentName,
        parent_name: data.parentName,
        email: data.email,
        phone: data.phone,
        program: data.program,
        age: data.age,
        message: data.message,
      });
      if (error) {
        console.error("Admission save failed:", error.message);
        setSubmitError("Could not save your enquiry. Please try again.");
        return;
      }

      openWhatsApp(
        data.program.startsWith("OP Kids")
          ? siteConfig.kidsWhatsapp
          : siteConfig.whatsapp,
        formatAdmissionWhatsAppMessage(data)
      );

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error("Admission save error:", err);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500";

  if (submitted) {
    return (
      <div className={cn("text-center py-12", className)}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Enquiry Submitted!</h3>
        <p className="text-muted-foreground">
          Your enquiry is saved in our system. WhatsApp is opening so you can
          send the details to us directly. Our team will contact you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-5", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Student Name *</label>
          <input {...register("studentName")} className={inputClass} placeholder="Student's full name" />
          {errors.studentName && (
            <p className="text-red-500 text-sm mt-1">{errors.studentName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Parent Name *</label>
          <input {...register("parentName")} className={inputClass} placeholder="Parent's full name" />
          {errors.parentName && (
            <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="your@email.com" />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone *</label>
          <input {...register("phone")} className={inputClass} placeholder="+91 98765 43210" />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Program *</label>
          <select {...register("program")} className={inputClass}>
            <option value="">Select a program</option>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.program && (
            <p className="text-red-500 text-sm mt-1">{errors.program.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Age / Class</label>
          <input {...register("age")} className={inputClass} placeholder="e.g. 4 years / Class 11" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Additional Message</label>
        <textarea
          {...register("message")}
          rows={3}
          className={cn(inputClass, "resize-none")}
          placeholder="Any specific questions or requirements?"
        />
      </div>
      {submitError && (
        <p className="text-red-500 text-sm">{submitError}</p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
