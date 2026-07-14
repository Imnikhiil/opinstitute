"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import {
  formatContactWhatsAppMessage,
  openWhatsApp,
} from "@/lib/whatsapp";

interface ContactFormProps {
  className?: string;
  variant?: "default" | "dark";
}

export function ContactForm({ className, variant = "default" }: ContactFormProps) {
  const siteConfig = useSiteConfig();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("queries").insert({
        type: "contact",
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });
      if (error) {
        console.error("Query save failed:", error.message);
        setSubmitError("Could not save your enquiry. Please try again.");
        return;
      }

      openWhatsApp(
        siteConfig.whatsapp,
        formatContactWhatsAppMessage(data)
      );

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error("Query save error:", err);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500",
    variant === "dark"
      ? "bg-white/10 border-white/20 text-white placeholder:text-white/50"
      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-foreground"
  );

  const labelClass = cn(
    "block text-sm font-medium mb-1.5",
    variant === "dark" ? "text-white/90" : "text-foreground"
  );

  if (submitted) {
    return (
      <div className={cn("text-center py-12", className)}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">
          Your enquiry is saved in our system. WhatsApp is opening so you can
          send the details to us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-5", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name</label>
          <input {...register("name")} className={inputClass} placeholder="Your name" />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            {...register("email")}
            type="email"
            className={inputClass}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            {...register("phone")}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Subject</label>
          <input
            {...register("subject")}
            className={inputClass}
            placeholder="Admission enquiry"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(inputClass, "resize-none")}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      {submitError && (
        <p className="text-red-500 text-sm">{submitError}</p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
