import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteConfig } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact OP Institute of Studies and OP Kids Pre School. Address, phone, email, WhatsApp, and contact form.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Contact Us
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
            We&apos;re here to help. Reach out for admissions, enquiries, or schedule a campus visit.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: siteConfig.address,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: `${siteConfig.phone}, ${siteConfig.phone2}`,
                    href: `tel:${siteConfig.phone}`,
                  },
                  {
                    icon: MapPin,
                    label: "Branch",
                    value: siteConfig.branchAddress,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: siteConfig.email,
                    href: `mailto:${siteConfig.email}`,
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Chat with us",
                    href: `https://wa.me/${siteConfig.whatsapp}`,
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    value: `${siteConfig.workingHours.weekdays} | ${siteConfig.workingHours.preschool}`,
                  },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.label === "WhatsApp" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-brand-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="glass-card p-6 md:p-8 h-full">
                <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden shadow-premium h-[400px]">
              <iframe
                src={siteConfig.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OP Institute Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
