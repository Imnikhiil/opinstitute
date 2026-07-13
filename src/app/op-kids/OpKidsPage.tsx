"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Puzzle,
  Shield,
  Monitor,
  Lightbulb,
  Music,
  Palette,
  Footprints,
  Gamepad2,
  Sun,
  PartyPopper,
  HeartHandshake,
  MessageCircle,
  LucideIcon,
  ArrowRight,
  Sparkles,
  Users,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/components/sections/Testimonials";
import { kidsFeatures, preschoolPrograms } from "@/data/site";
import type { Testimonial } from "@/data/testimonials";

const iconMap: Record<string, LucideIcon> = {
  Puzzle,
  Shield,
  Monitor,
  Lightbulb,
  Music,
  Palette,
  Footprints,
  Gamepad2,
  Sun,
  PartyPopper,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Users,
  Lock,
};

const programPalettes = [
  {
    emoji: "🧸",
    bar: "from-amber-400 to-orange-400",
    pill: "bg-amber-100 text-amber-700",
    blob: "bg-amber-300/40",
    title: "group-hover:text-amber-600",
    ring: "group-hover:border-amber-300",
  },
  {
    emoji: "🎨",
    bar: "from-pink-400 to-rose-400",
    pill: "bg-pink-100 text-pink-700",
    blob: "bg-pink-300/40",
    title: "group-hover:text-pink-600",
    ring: "group-hover:border-pink-300",
  },
  {
    emoji: "📚",
    bar: "from-violet-400 to-purple-400",
    pill: "bg-violet-100 text-violet-700",
    blob: "bg-violet-300/40",
    title: "group-hover:text-violet-600",
    ring: "group-hover:border-violet-300",
  },
  {
    emoji: "⭐",
    bar: "from-sky-400 to-cyan-400",
    pill: "bg-sky-100 text-sky-700",
    blob: "bg-sky-300/40",
    title: "group-hover:text-sky-600",
    ring: "group-hover:border-sky-300",
  },
];

const floatingEmojis = [
  { e: "🎨", cls: "top-[18%] left-[8%] text-5xl", dur: 6, y: -18 },
  { e: "🎵", cls: "bottom-[22%] left-[14%] text-4xl", dur: 5, y: 16 },
  { e: "🧸", cls: "top-[26%] right-[10%] text-5xl", dur: 7, y: -14 },
  { e: "🎈", cls: "bottom-[18%] right-[16%] text-4xl", dur: 6.5, y: 18 },
  { e: "⭐", cls: "top-[12%] left-[45%] text-3xl", dur: 5.5, y: -12 },
  { e: "🌈", cls: "bottom-[12%] left-[38%] text-4xl", dur: 8, y: 14 },
];

export function OpKidsPage({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <>
      {/* Colorful Hero */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kids-400 via-accent-pink to-accent-purple bg-[length:200%_200%] animate-gradient-x" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-60" />

        {/* Soft animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-accent-yellow/20 blur-3xl"
        />

        {/* Floating playful emojis */}
        {floatingEmojis.map((f, i) => (
          <motion.div
            key={i}
            aria-hidden
            animate={{ y: [0, f.y, 0], rotate: [0, 8, 0] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut" }}
            className={`hidden sm:block absolute ${f.cls} opacity-40 select-none`}
          >
            {f.e}
          </motion.div>
        ))}

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/25 backdrop-blur-sm text-white text-sm font-semibold mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Where Kids Love to Learn
            </motion.span>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
              whileHover={{ rotate: [0, -2, 2, 0], transition: { duration: 0.5 } }}
              className="mx-auto mb-8 inline-flex rounded-3xl bg-white p-5 md:p-7 shadow-2xl"
            >
              <Image
                src="/logos/op-kids-logo.png"
                alt="OP Kids Pre School — Where Kids Love to Learn"
                width={520}
                height={280}
                priority
                className="h-auto w-[260px] md:w-[420px] object-contain"
              />
            </motion.div>
            <h1 className="sr-only">OP Kids Pre School — Where Kids Love to Learn</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              A magical world of colors, creativity, and joyful learning for
              children aged 2–6 years — where kids love to learn!
            </p>
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-kids-600 hover:bg-white/90 shadow-xl">
                Enroll Your Child
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-[60px] md:h-[90px] fill-background"
          >
            <path d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,72 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding relative overflow-hidden">
        {/* Playful background accents */}
        <motion.span
          aria-hidden
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-24 left-[5%] text-5xl opacity-15 select-none"
        >
          🎈
        </motion.span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute bottom-16 right-[6%] text-5xl opacity-15 select-none"
        >
          🌈
        </motion.span>
        <div className="absolute -top-10 right-1/4 w-72 h-72 rounded-full bg-kids-300/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-accent-purple/10 blur-3xl" />

        <div className="container-custom relative">
          <ScrollReveal>
            <SectionHeader
              badge="Why OP Kids"
              title="Everything Your Child Needs to Thrive"
              subtitle="A nurturing environment designed for happy, confident learners"
              variant="kids"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {kidsFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Puzzle;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`}
                  />
                  {/* Soft colored glow on hover */}
                  <div
                    className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg mb-2 relative">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-kids-50 via-pink-50 to-purple-50 dark:from-kids-950/20 dark:via-pink-950/10 dark:to-purple-950/10">
        <div className="absolute top-10 right-[8%] w-64 h-64 rounded-full bg-accent-pink/10 blur-3xl" />
        <div className="container-custom relative">
          <ScrollReveal>
            <SectionHeader
              badge="Programs"
              title="Age-Appropriate Programs"
              subtitle="A joyful step for every age — from first steps to school-ready"
              variant="kids"
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preschoolPrograms.map((prog, i) => {
              const p = programPalettes[i % programPalettes.length];
              return (
                <motion.div
                  key={prog.name}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white dark:bg-gray-900 rounded-3xl p-6 pt-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${p.bar}`} />
                  <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full ${p.blob} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent ${p.ring} transition-colors duration-300`} />

                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                    className="text-4xl mb-3 select-none transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                  >
                    {p.emoji}
                  </motion.div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${p.pill}`}>
                    {prog.age}
                  </span>
                  <h3 className={`font-display font-bold text-xl mb-2 transition-colors ${p.title}`}>
                    {prog.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{prog.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image showcase */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Life at OP Kids"
              title="Little Moments, Big Smiles"
              subtitle="A peek into our colorful, joyful world of learning and play"
              variant="kids"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80", label: "Creative Play", ring: "ring-amber-300" },
              { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80", label: "Learning Together", ring: "ring-pink-300" },
              { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80", label: "Happy Faces", ring: "ring-violet-300" },
              { src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80", label: "Fun Activities", ring: "ring-sky-300" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                className={`group relative rounded-3xl overflow-hidden shadow-card aspect-square ring-4 ${item.ring} ring-offset-2 ring-offset-background`}
              >
                <Image
                  src={item.src}
                  alt={`OP Kids — ${item.label}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <Testimonials
        testimonials={testimonials}
        filter="preschool"
        variant="kids"
        badge="Happy Parents"
        title="What Parents Say"
        subtitle="Loved by families who trust us with their little ones"
      />

      {/* CTA */}
      <section className="section-padding relative overflow-hidden bg-kids-gradient bg-[length:200%_200%] animate-gradient-x">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <motion.span
          aria-hidden
          animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-10 left-[12%] text-5xl opacity-40 select-none"
        >
          🎈
        </motion.span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute bottom-10 right-[12%] text-5xl opacity-40 select-none"
        >
          ⭐
        </motion.span>

        <div className="container-custom text-center relative z-10">
          <ScrollReveal>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-4 select-none"
            >
              🎓
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Give Your Child the Best Start
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Limited seats available for 2025-26. Schedule a campus visit today!
            </p>
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-kids-600 hover:bg-white/90 shadow-xl">
                Book a Visit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
