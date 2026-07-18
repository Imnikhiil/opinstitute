"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Heart,
  Images,
  Monitor,
  Shield,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StatCounter } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/components/sections/Testimonials";
import { stats, whyChooseUs, facilities } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/testimonials";
import type { Course } from "@/data/courses";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Users,
  BookOpen,
  Monitor,
  Shield,
  Heart,
};

const exploreLinks = [
  {
    href: "/courses",
    title: "Browse Courses",
    detail: "CMA, B.Com & school tuition",
    icon: BookOpen,
    tone: "from-brand-500 to-brand-700",
  },
  {
    href: "/faculty?category=institute",
    title: "Meet Faculty",
    detail: "Founder, management & teachers",
    icon: GraduationCap,
    tone: "from-indigo-500 to-brand-600",
  },
  {
    href: "/gallery?brand=institute",
    title: "Institute Gallery",
    detail: "Campus, classrooms & achievements",
    icon: Images,
    tone: "from-sky-500 to-brand-600",
  },
  {
    href: "/events?brand=institute",
    title: "Events",
    detail: "Tests, celebrations & activities",
    icon: CalendarDays,
    tone: "from-violet-500 to-brand-700",
  },
];

const pathway = [
  {
    title: "School Foundation",
    detail: "Class I–XII tuition with concept clarity and exam focus.",
    emoji: "📖",
  },
  {
    title: "Commerce Edge",
    detail: "B.Com Pass & Honours with semester-wise mentoring.",
    emoji: "💼",
  },
  {
    title: "Professional Path",
    detail: "CMA coaching from Foundation through Final.",
    emoji: "🎯",
  },
];

export function InstitutePage({
  testimonials,
  courses,
}: {
  testimonials: Testimonial[];
  courses: Course[];
}) {
  const featuredCourses = courses.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-24 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(126,131,255,0.35),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.25),transparent_45%)]" />

        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-16 w-96 h-96 rounded-full bg-brand-400/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-10 w-[28rem] h-[28rem] rounded-full bg-indigo-400/15 blur-3xl"
        />

        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-brand-100 text-sm font-semibold mb-5 ring-1 ring-white/15"
          >
            <Trophy className="w-4 h-4 text-gold-400" />
            Excellence since 2003
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            OP Institute
            <span className="block text-brand-200 text-2xl sm:text-3xl md:text-4xl mt-2 font-semibold">
              of Studies
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed"
          >
            CMA coaching, B.Com mentoring, and Class I–XII tuition — structured
            teaching that builds confidence and results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link href="/courses">
              <Button size="lg" className="group rounded-full bg-white text-brand-700 hover:bg-white/90 shadow-xl">
                Explore Courses
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/admissions">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 text-white hover:bg-white/10"
              >
                Enquire Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 pb-2 z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-brand-900/10 border border-brand-100/80 dark:border-white/10 p-4 sm:p-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.06}>
                <div className="text-center py-2">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-brand-700 dark:text-brand-300">
                    <StatCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Why OP Institute"
              title="Built for Serious Learners"
              subtitle="Results-focused teaching with personal attention since 2003"
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Sparkles;
              return (
                <ScrollReveal key={item.title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-brand-100 dark:border-white/10 bg-white dark:bg-gray-900 p-5 sm:p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-300 mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-bold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pathway */}
      <section className="section-padding bg-gradient-to-br from-brand-50 via-indigo-50/50 to-white dark:from-brand-950/30 dark:via-gray-950 dark:to-gray-950">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Your Journey"
              title="From School to Professional Success"
              subtitle="One institute — clear pathways for every stage"
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {pathway.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="relative rounded-3xl bg-white dark:bg-gray-900 border border-brand-100 dark:border-white/10 p-6 text-center shadow-sm h-full">
                  <span className="text-4xl mb-3 block select-none">{step.emoji}</span>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-500 mb-2">
                    Step {i + 1}
                  </p>
                  <h3 className="font-display font-bold text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses teaser */}
      {featuredCourses.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <ScrollReveal>
              <SectionHeader
                badge="Programs"
                title="Popular Courses"
                subtitle="Full details and batches are on the Courses page"
              />
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {featuredCourses.map((course, i) => (
                <ScrollReveal key={course.id} delay={i * 0.07}>
                  <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900 p-5 sm:p-6 h-full hover:shadow-card-hover transition-shadow">
                    {course.popular && (
                      <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                        Popular
                      </span>
                    )}
                    <h3 className="font-display font-bold text-lg sm:text-xl mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    <p className="text-xs font-medium text-brand-600 dark:text-brand-400">
                      {course.duration}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.2}>
              <div className="mt-8 text-center">
                <Link href="/courses">
                  <Button className="group rounded-full">
                    View All Courses
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Campus snapshot */}
      <section className="section-padding bg-gray-50/80 dark:bg-gray-900/30">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Campus"
              title="Spaces Built for Focus"
              subtitle="Classrooms and facilities that support serious study"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {facilities.slice(0, 4).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 text-center">
              <Link href="/gallery?brand=institute">
                <Button variant="outline" className="group rounded-full">
                  Open Institute Gallery
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Explore nav strip */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Explore Institute"
              title="Everything in One Place"
              subtitle="Courses, teachers, photos and events — open from the menu or here"
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {exploreLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.href} delay={i * 0.07}>
                  <Link
                    href={item.href}
                    className="group flex flex-col items-center text-center rounded-3xl bg-white dark:bg-gray-900 border border-brand-100 dark:border-white/10 p-6 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all"
                  >
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg mb-4 group-hover:scale-110 transition-transform",
                        item.tone
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="font-display font-bold text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {item.detail}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Open
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials
        testimonials={testimonials}
        filter="institute"
        badge="Student Voices"
        title="What Students & Parents Say"
        subtitle="Trusted by families across Mahavir Enclave and beyond"
      />

      {/* CTA */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="container-custom text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Join OP Institute?
            </h2>
            <p className="text-white/85 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
              Admissions open for 2026-27. Talk to our team and find the right
              program for you.
            </p>
            <Link href="/admissions">
              <Button
                size="lg"
                className="bg-white text-brand-700 hover:bg-white/90 shadow-xl rounded-full"
              >
                Start Admission Enquiry
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
