"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { admissionSteps } from "@/data/site";
import { ArrowRight } from "lucide-react";

export function AdmissionProcess() {
  return (
    <section id="admissions" className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Admissions"
            title="Simple Admission Process"
            subtitle="Four easy steps to begin your journey with us"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionSteps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.1}>
              <div className="relative glass-card p-6 text-center h-full hover:shadow-card-hover transition-all hover:-translate-y-1">
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-brand-200 dark:bg-brand-800" />
                )}
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-10">
            <Link href="/admissions">
              <Button size="lg">
                Apply for Admission
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
