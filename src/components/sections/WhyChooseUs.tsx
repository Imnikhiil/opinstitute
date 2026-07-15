"use client";

import {
  Award,
  Users,
  BookOpen,
  Monitor,
  Shield,
  Heart,
  LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { whyChooseUs } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Users,
  BookOpen,
  Monitor,
  Shield,
  Heart,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Why Choose Us"
            title="The OP Institute Advantage"
            subtitle="Discover what makes us the preferred choice for parents and students"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="group premium-card tap-card p-5 sm:p-6 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-600 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
