"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { LeadershipStrip } from "@/components/sections/LeadershipHighlight";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { aboutContent } from "@/data/site";
import type { GalleryImage } from "@/data/gallery";
import type { Leader } from "@/data/leadership";

export function AboutInstitute({
  frontDeskPhoto,
  leaders,
}: {
  frontDeskPhoto?: GalleryImage;
  leaders?: Leader[];
}) {
  const { enterInstitute } = useSiteBrand();
  const photoSrc =
    frontDeskPhoto?.src || "/images/campus/front-desk.jpg";
  const photoAlt =
    frontDeskPhoto?.alt ||
    "OP Institute front desk — Founder Om Prakash";

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-500/20 to-transparent rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
                <Image
                  src={photoSrc}
                  alt={photoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-6 glass-card p-4 sm:p-6 rounded-2xl shadow-card z-10">
                <p className="text-2xl sm:text-3xl font-bold gradient-text">
                  20+
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Years of Trust · Since 2003
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <SectionHeader
              badge="Since 2003"
              title="OP Institute of Studies"
              subtitle="Two decades of academic excellence and holistic development"
              align="left"
            />
            <p className="text-muted-foreground leading-relaxed mb-6">
              {aboutContent.history}
            </p>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400 mb-3">
                Led by our Founder
              </p>
              <LeadershipStrip leaders={leaders} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/institute" onClick={() => enterInstitute()}>
                <Button>
                  Explore Institute
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline">
                  Founder&apos;s Message
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
