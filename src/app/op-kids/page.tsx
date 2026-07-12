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
import { kidsFeatures, preschoolPrograms } from "@/data/site";

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

export default function OpKidsPage() {
  return (
    <>
      {/* Colorful Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kids-400 via-accent-pink to-accent-purple" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-60" />

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 text-6xl opacity-30"
        >
          🎨
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-5xl opacity-30"
        >
          🎵
        </motion.div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Newly Launched
            </span>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
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
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
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
                <ScrollReveal key={feature.title} delay={index * 0.05}>
                  <div className="group relative rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`}
                    />
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-gradient-to-br from-kids-50 via-pink-50 to-purple-50 dark:from-kids-950/20 dark:via-pink-950/10 dark:to-purple-950/10">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Programs"
              title="Age-Appropriate Programs"
              variant="kids"
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preschoolPrograms.map((prog, i) => (
              <ScrollReveal key={prog.name} delay={i * 0.1}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-card border-2 border-kids-200 dark:border-kids-800">
                  <span className="text-kids-600 font-bold text-sm">{prog.age}</span>
                  <h3 className="font-display font-bold text-xl mt-1 mb-2">{prog.name}</h3>
                  <p className="text-muted-foreground text-sm">{prog.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image showcase */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80",
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
              "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
              "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
            ].map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden shadow-card aspect-square relative">
                  <Image src={src} alt={`OP Kids activity ${i + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-kids-gradient">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Give Your Child the Best Start
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Limited seats available for 2025-26. Schedule a campus visit today!
            </p>
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-kids-600 hover:bg-white/90">
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
