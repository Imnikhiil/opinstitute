import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/supabase/public-data";
import { resolveCampuses } from "@/data/site";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit OP Institute of Studies and OP Kids Pre School at Mahavir Enclave Part 2, New Delhi. Call, WhatsApp, or send an enquiry.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const campuses = resolveCampuses(siteConfig);

  return (
    <ContactPageClient
      campuses={campuses}
      extras={{
        email: siteConfig.email,
        kidsEmail: siteConfig.kidsEmail,
        whatsapp: siteConfig.whatsapp,
        kidsWhatsapp: siteConfig.kidsWhatsapp,
        weekdayHours: siteConfig.workingHours.weekdays,
        preschoolHours: siteConfig.workingHours.preschool,
        sundayHours: siteConfig.workingHours.sunday,
      }}
    />
  );
}
