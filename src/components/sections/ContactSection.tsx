"use client";

import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { BrandSocialLinks } from "@/components/ui/BrandSocialLinks";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { resolveCampuses } from "@/data/site";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const siteConfig = useSiteConfig();
  const campuses = resolveCampuses(siteConfig);

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Contact"
            title="Get in Touch"
            subtitle="Both listings are at Mahavir Enclave Part 2 — pick Institute or OP Kids."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
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
                  <div className="mt-3 space-y-1.5 text-sm">
                    <a
                      href={`tel:${campus.phone}`}
                      className="flex items-center gap-1.5 font-medium hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {campus.phone}
                    </a>
                    <a
                      href={`mailto:${campus.email}`}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground break-all"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {campus.email}
                    </a>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {campus.hours}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={campus.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Directions
                    </a>
                    <BrandSocialLinks
                      social={campus.social}
                      accent={campus.accent}
                      size="sm"
                      className={
                        campus.accent === "brand"
                          ? "[&_a]:bg-brand-50 [&_a]:text-brand-700 dark:[&_a]:bg-brand-950/40 dark:[&_a]:text-brand-300"
                          : "[&_a]:bg-kids-50 [&_a]:text-kids-700 dark:[&_a]:bg-kids-950/30 dark:[&_a]:text-kids-300"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-3">
            <div className="glass-card p-4 sm:p-6 md:p-8">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
