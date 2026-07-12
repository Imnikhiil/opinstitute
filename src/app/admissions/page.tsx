import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { Button } from "@/components/ui/Button";
import { admissionSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Apply for admission at OP Institute of Studies and OP Kids Pre School. Simple 4-step process with online enquiry form.",
};

export default function AdmissionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Admissions
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
            Begin your journey with OP Institute. Admissions open for 2025-26 academic year.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Process"
              title="Admission Process"
              subtitle="Four simple steps to join our family"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {admissionSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="glass-card p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <ScrollReveal direction="left" className="lg:col-span-3">
              <div className="glass-card p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Admission Enquiry Form
                </h2>
                <AdmissionForm />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-2">
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg mb-3">
                    Download Brochure
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get detailed information about our programs, fees, and facilities.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
                <div className="glass-card p-6 bg-brand-50 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Need Help?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our admissions counsellors are available Monday to Saturday,
                    9 AM to 6 PM. Call us or visit the campus for a personal tour.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
