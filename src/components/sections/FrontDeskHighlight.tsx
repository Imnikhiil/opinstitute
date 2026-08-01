"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Headphones,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { frontDeskStaff } from "@/data/site";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import type { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

const highlightIcons = [ClipboardList, MessageCircle, Headphones];

export function FrontDeskHighlight({
  photo,
  className,
}: {
  photo?: GalleryImage;
  className?: string;
}) {
  const siteConfig = useSiteConfig();
  const src = photo?.src || "/images/campus/reception.jpg";
  const alt =
    photo?.alt ||
    `${frontDeskStaff.displayName} — ${frontDeskStaff.title} at OP Institute`;

  return (
    <section
      className={cn(
        "section-padding relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-gold-50/40 dark:from-brand-950/30 dark:via-gray-950 dark:to-gray-900",
        className
      )}
    >
      <div className="absolute top-10 right-[8%] w-64 h-64 rounded-full bg-brand-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 left-[6%] w-56 h-56 rounded-full bg-gold-300/15 blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <ScrollReveal>
          <SectionHeader
            badge={frontDeskStaff.badge}
            title={frontDeskStaff.sectionTitle}
            subtitle={frontDeskStaff.sectionSubtitle}
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-brand-500/25 via-gold-400/15 to-transparent rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-premium aspect-[4/5] sm:aspect-[5/6] max-w-md mx-auto lg:mx-0 ring-1 ring-brand-200/60 dark:ring-white/10">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  quality={92}
                  className="object-cover object-[center_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/85 via-brand-900/40 to-transparent p-5 sm:p-6">
                  <p className="text-white font-display font-bold text-lg sm:text-xl">
                    {frontDeskStaff.displayName}
                  </p>
                  <p className="text-brand-100 text-sm mt-0.5">
                    {frontDeskStaff.title}
                  </p>
                </div>
              </div>
              <div className="absolute -top-2 -right-1 sm:top-4 sm:-right-3 inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-gray-900 shadow-card px-3 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                First point of contact
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.12}>
            <div className="space-y-5 sm:space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400 mb-2">
                  {frontDeskStaff.organization}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1d2951] dark:text-white tracking-tight">
                  Here to help you from the first hello
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {frontDeskStaff.message}
                </p>
              </div>

              <ul className="space-y-3">
                {frontDeskStaff.highlights.map((item, i) => {
                  const Icon = highlightIcons[i] ?? ClipboardList;
                  return (
                    <li
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-brand-100/80 dark:border-white/10 bg-white/80 dark:bg-gray-900/60 px-4 py-3.5 shadow-sm"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/admissions">
                  <Button>
                    Ask about admissions
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={`tel:${siteConfig.phone}`}>
                  <Button variant="outline">
                    <Phone className="w-4 h-4" />
                    Call front desk
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="ghost">Send a query</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
