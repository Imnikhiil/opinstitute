import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Star,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteConfig } from "@/lib/supabase/public-data";
import { resolveCampuses } from "@/data/site";
import { cn } from "@/lib/utils";
import { BrandSocialLinks } from "@/components/ui/BrandSocialLinks";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit O.P. Institute of Studies and OP Kids Pre School at Mahavir Enclave Part 2, New Delhi. Call, WhatsApp, or send an enquiry.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const campuses = resolveCampuses(siteConfig);
  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Contact Us
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
            Two Google listings at Mahavir Enclave Part 2 — OP Institute and OP
            Kids, each with its own phone, email, and social links.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Dual campus cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {campuses.map((campus, i) => (
              <ScrollReveal key={campus.id} delay={i * 0.08}>
                <article
                  className={cn(
                    "h-full rounded-3xl border bg-white dark:bg-gray-900 overflow-hidden shadow-sm",
                    campus.accent === "brand"
                      ? "border-brand-200/80 dark:border-brand-800"
                      : "border-kids-200/80 dark:border-kids-800/40"
                  )}
                >
                  <div
                    className={cn(
                      "px-6 py-4 border-b",
                      campus.accent === "brand"
                        ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white border-brand-700"
                        : "bg-gradient-to-r from-kids-500 to-kids-600 text-white border-kids-600"
                    )}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                      {campus.category}
                    </p>
                    <h2 className="font-display text-xl font-bold mt-0.5">
                      {campus.name}
                    </h2>
                    <p className="text-sm text-white/85 mt-1 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {campus.ratingNote}
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin
                        className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          campus.accent === "brand"
                            ? "text-brand-600"
                            : "text-kids-600"
                        )}
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                          Address
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          {campus.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone
                        className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          campus.accent === "brand"
                            ? "text-brand-600"
                            : "text-kids-600"
                        )}
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                          Phone
                        </p>
                        <a
                          href={`tel:${campus.phone}`}
                          className="text-sm font-semibold text-foreground hover:underline"
                        >
                          {campus.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail
                        className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          campus.accent === "brand"
                            ? "text-brand-600"
                            : "text-kids-600"
                        )}
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                          Email
                        </p>
                        <a
                          href={`mailto:${campus.email}`}
                          className="text-sm font-semibold text-foreground hover:underline break-all"
                        >
                          {campus.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock
                        className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          campus.accent === "brand"
                            ? "text-brand-600"
                            : "text-kids-600"
                        )}
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                          Hours
                        </p>
                        <p className="text-sm text-foreground">{campus.hours}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={campus.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition",
                          campus.accent === "brand"
                            ? "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-300"
                            : "bg-kids-50 text-kids-700 hover:bg-kids-100 dark:bg-kids-950/30 dark:text-kids-300"
                        )}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Directions
                      </a>
                      <a
                        href={`tel:${campus.phone}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
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

                  <div className="h-[220px] border-t border-gray-100 dark:border-white/5">
                    <iframe
                      src={campus.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${campus.name} location map`}
                    />
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: siteConfig.email,
                    href: `mailto:${siteConfig.email}`,
                  },
                  {
                    icon: WhatsAppIcon,
                    label: "WhatsApp",
                    value: "Chat with admissions team",
                    href: `https://wa.me/${siteConfig.whatsapp}`,
                  },
                  {
                    icon: Clock,
                    label: "Weekly schedule",
                    value: `${siteConfig.workingHours.weekdays} · ${siteConfig.workingHours.preschool} · ${siteConfig.workingHours.sunday}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-card p-5 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <item.icon
                        className={
                          item.label === "WhatsApp"
                            ? "w-5 h-5 text-[#25D366]"
                            : "w-5 h-5 text-brand-600"
                        }
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.label === "WhatsApp" ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-brand-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <div className="glass-card p-6 md:p-8 h-full">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
