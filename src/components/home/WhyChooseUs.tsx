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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="group premium-card tap-card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
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
