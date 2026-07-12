"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { preschoolPrograms } from "@/data/site";

export function PreschoolPrograms() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-kids-gradient opacity-5" />
      <div className="container-custom relative">
        <ScrollReveal>
          <SectionHeader
            badge="OP Kids Programs"
            title="Preschool Programs"
            subtitle="Age-appropriate programs designed for holistic early childhood development"
            variant="kids"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {preschoolPrograms.map((program, index) => (
            <ScrollReveal key={program.name} delay={index * 0.1}>
              <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-kids-300 dark:hover:border-kids-700 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-kids-400 via-accent-pink to-accent-purple" />
                <span className="inline-block px-3 py-1 rounded-full bg-kids-100 dark:bg-kids-900/30 text-kids-700 dark:text-kids-300 text-xs font-semibold mb-3">
                  {program.age}
                </span>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-kids-600 transition-colors">
                  {program.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {program.description}
                </p>
                <ul className="space-y-1.5">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-kids-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/op-kids">
              <Button variant="kids">
                Explore OP Kids
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
