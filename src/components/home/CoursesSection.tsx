"use client";

import Link from "next/link";
import { ArrowRight, Clock, Users, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { courses } from "@/data/courses";

export function CoursesSection() {
  const featured = courses.filter((c) => c.popular).slice(0, 3);

  return (
    <section id="courses" className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Courses"
            title="Programs & Courses"
            subtitle="Comprehensive coaching for board exams and competitive entrance tests"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, index) => (
            <ScrollReveal key={course.id} delay={index * 0.1}>
              <div className="group glass-card p-6 h-full flex flex-col hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {course.popular && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                    Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-brand-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.eligibility.split(" ")[0]}
                  </span>
                </div>
                <ul className="space-y-1.5 mb-6">
                  {course.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/admissions">
                  <Button variant="outline" size="sm" className="w-full">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
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
