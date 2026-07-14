"use client";

import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { campuses } from "@/data/site";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const siteConfig = useSiteConfig();

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Contact"
            title="Get in Touch"
            subtitle="Visit our Mahavir Enclave campuses or send an enquiry online."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-4">
              {campuses.map((campus) => (
                <div
                  key={campus.id}
                  className={cn(
                    "rounded-2xl border p-4 bg-white dark:bg-gray-900",
                    campus.accent === "brand"
                      ? "border-brand-200/70 dark:border-brand-800"
                      : "border-kids-200/70 dark:border-kids-800/40"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wide mb-1",
                      campus.accent === "brand"
                        ? "text-brand-600"
                        : "text-kids-600"
                    )}
                  >
                    {campus.shortName}
                  </p>
                  <p className="font-display font-bold text-sm mb-2">
                    {campus.name}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    {campus.address}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a
                      href={`tel:${campus.phone}`}
                      className="inline-flex items-center gap-1.5 font-medium hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {campus.phone}
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {campus.hours}
                    </span>
                  </div>
                  <a
                    href={campus.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-brand-600 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Get directions
                  </a>
                </div>
              ))}

              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted-foreground text-sm hover:text-brand-600 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
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
