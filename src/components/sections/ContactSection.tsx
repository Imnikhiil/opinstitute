"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function ContactSection() {
  const siteConfig = useSiteConfig();

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Contact"
            title="Get in Touch"
            subtitle="We'd love to hear from you. Reach out for admissions, enquiries, or a campus visit."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: siteConfig.address },
                { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: Clock, label: "Working Hours", value: siteConfig.workingHours.weekdays },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground text-sm hover:text-brand-600 transition-colors">
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

          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
