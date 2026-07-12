"use client";

import { ScrollReveal, StatCounter } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stats } from "@/data/site";
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-4xl md:text-5xl font-bold text-white">
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/80 mt-2 text-sm">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/15 hover:bg-white/20 transition-colors">
                <item.icon className="w-10 h-10 text-brand-200 mx-auto mb-3" />
                <h3 className="font-display font-semibold text-white text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
