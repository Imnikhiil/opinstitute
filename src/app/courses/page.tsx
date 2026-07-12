"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Users, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { courses, courseCategories } from "@/data/courses";
import { Testimonials } from "@/components/sections/Testimonials";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Our Courses
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
            CA, CS, CMA, B.Com and school tuition programs designed for academic
            excellence and career success.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/25"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((course, index) => (
              <ScrollReveal key={course.id} delay={index * 0.08}>
                <div className="glass-card p-6 md:p-8 h-full flex flex-col hover:shadow-card-hover transition-all hover:-translate-y-1 relative">
                  {course.popular && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                      Popular
                    </span>
                  )}
                  <h2 className="font-display font-bold text-2xl mb-3">
                    {course.name}
                  </h2>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-500" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-500" />
                      {course.eligibility}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/admissions">
                    <Button className="w-full">Enquire Now</Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <Testimonials
        filter="institute"
        badge="Success Stories"
        title="What Our Students Say"
        subtitle="Hear from students who achieved their goals with OP Institute"
      />
    </>
  );
}
