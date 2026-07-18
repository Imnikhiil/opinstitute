"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function AboutKids() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-kids-50 via-pink-50 to-purple-50 dark:from-kids-950/20 dark:via-pink-950/10 dark:to-purple-950/10" />
      <div className="container-custom relative">
        <ScrollReveal>
          <SectionHeader
            badge="OP Kids Pre School"
            title="OP Kids Pre School"
            subtitle="A colorful world where little minds bloom with joy, creativity, and confidence"
            variant="kids"
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="inline-flex rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-card">
                <Image
                  src="/logos/op-kids-logo.png"
                  alt="OP Kids Pre School — Where Kids Love to Learn"
                  width={320}
                  height={172}
                  className="h-auto w-[180px] sm:w-[240px] object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Welcome to <strong className="text-kids-600 dark:text-kids-400">OP Kids Pre School</strong> — 
                where kids love to learn! Our play-based curriculum, caring teachers, and 
                vibrant environment make learning natural and fun for children aged 2-6 years.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Play Group", "Nursery", "LKG", "UKG"].map((prog) => (
                  <span
                    key={prog}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white dark:bg-gray-900 shadow-card text-xs sm:text-sm font-medium border border-kids-200 dark:border-kids-800"
                  >
                    {prog}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-kids-400 text-kids-400" />
                ))}
                <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">
                  Loved by 200+ parents
                </span>
              </div>
              <Link href="/op-kids">
                <Button variant="kids" size="lg">
                  Discover OP Kids Pre School
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-kids-gradient opacity-20 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-2 sm:gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&q=80"
                  alt="Kids playing outdoors"
                  width={250}
                  height={200}
                  className="rounded-xl sm:rounded-2xl object-cover h-28 sm:h-40 w-full shadow-card"
                  loading="lazy"
                />
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80"
                  alt="Art and craft activity"
                  width={250}
                  height={200}
                  className="rounded-xl sm:rounded-2xl object-cover h-28 sm:h-40 w-full shadow-card mt-6 sm:mt-8"
                  loading="lazy"
                />
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80"
                  alt="Classroom learning"
                  width={250}
                  height={200}
                  className="rounded-xl sm:rounded-2xl object-cover h-28 sm:h-40 w-full shadow-card -mt-2 sm:-mt-4"
                  loading="lazy"
                />
                <Image
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&q=80"
                  alt="Kids celebration"
                  width={250}
                  height={200}
                  className="rounded-xl sm:rounded-2xl object-cover h-28 sm:h-40 w-full shadow-card mt-2 sm:mt-4"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
