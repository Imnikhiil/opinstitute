"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { courses } from "@/data/courses";

export function CoursesSection() {
  const featured = courses.filter((c) => c.popular).slice(0, 3);

  return (
    <section id="courses" className="section-padding bg-[#f5f5f7] dark:bg-gray-900/40">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Programs & Courses"
            title="Professional & Academic Coaching"
            subtitle="From CA, CS, CMA and B.Com to school tuition for Classes I–XII — structured programs built for real results."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, index) => (
            <ScrollReveal key={course.id} delay={index * 0.1}>
              <div className="group premium-card p-7 h-full flex flex-col relative overflow-hidden">
                <span
                  className="font-display text-5xl font-bold text-gray-100 dark:text-white/5 absolute top-5 right-6 select-none transition-colors group-hover:text-brand-100 dark:group-hover:text-brand-900/40"
                  aria-hidden
                >
                  0{index + 1}
                </span>

                <span className="inline-flex w-fit items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 mb-5">
                  {course.duration}
                </span>

                <h3 className="font-display font-bold text-xl mb-2.5 group-hover:text-brand-600 transition-colors relative z-10">
                  {course.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 flex-grow line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <ul className="space-y-2 mb-6 border-t border-gray-100 dark:border-white/10 pt-5">
                  {course.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all"
                >
                  Enquire Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button>
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
