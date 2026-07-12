"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Medal, Star, Target } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "CA / CS / CMA Success",
    description: "Students clearing professional exams every year",
  },
  {
    icon: Medal,
    title: "B.Com Excellence",
    description: "Consistent top university results in B.Com",
  },
  {
    icon: Star,
    title: "Board Toppers",
    description: "95%+ average in Class 10 & 12 board exams",
  },
  {
    icon: Target,
    title: "Strong Foundation",
    description: "Two decades of trusted school tuition",
  },
];

export function Achievements() {
  return (
    <section className="section-padding relative overflow-hidden bg-accent-gradient">
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge="Achievements"
            title="Our Track Record"
            subtitle="Consistent excellence that speaks for itself"
            variant="light"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="h-full bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/15 hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1.5">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
