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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {admissionSteps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.1}>
              <div className="relative premium-card tap-card p-4 sm:p-6 text-center h-full">
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-brand-200 dark:bg-brand-800" />
                )}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-600 text-white font-bold text-base sm:text-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{step.description}</p>
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
