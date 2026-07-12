"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { aboutContent } from "@/data/site";

export function AboutInstitute() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-500/20 to-transparent rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-premium">
                <Image
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80"
                  alt="OP Institute campus"
                  width={600}
                  height={450}
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-card">
                <p className="text-3xl font-bold gradient-text">20+</p>
                <p className="text-sm text-muted-foreground">Years of Trust · Since 2003</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <SectionHeader
              badge="Since 2003"
              title="O.P. Institute of Studies"
              subtitle="Two decades of academic excellence and holistic development"
              align="left"
            />
            <p className="text-muted-foreground leading-relaxed mb-6">
              {aboutContent.history}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-4">
                <p className="font-semibold text-brand-600 dark:text-brand-400">Vision</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                  {aboutContent.vision.slice(0, 80)}...
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="font-semibold text-brand-600 dark:text-brand-400">Mission</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                  {aboutContent.mission.slice(0, 80)}...
                </p>
              </div>
            </div>
            <Link href="/about">
              <Button variant="outline">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
