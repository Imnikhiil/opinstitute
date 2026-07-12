"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Baby, GraduationCap, BookOpen, Award, Briefcase, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { learningJourney } from "@/data/site";

const icons = [Baby, BookOpen, GraduationCap, Award, Briefcase];

export function LearningJourney() {
  return (
    <section className="section-padding relative overflow-hidden bg-brand-950">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-kids-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-brand-500/30 blur-3xl" />

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge="One Family · Two Worlds"
            title="The Complete Learning Journey"
            subtitle="From a child's very first day to a professional degree — OP nurtures every stage under one trusted roof."
            variant="light"
          />
        </ScrollReveal>

        {/* ---------- MOBILE / TABLET: vertical timeline ---------- */}
        <div className="lg:hidden relative pl-2">
          {/* vertical line */}
          <div className="absolute left-[1.85rem] top-3 bottom-3 w-0.5 bg-gradient-to-b from-kids-400 via-brand-400 to-brand-300" />
          <div className="space-y-5">
            {learningJourney.map((step, i) => {
              const Icon = icons[i] || GraduationCap;
              const isKids = step.brand === "kids";
              return (
                <ScrollReveal key={step.title} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative z-10 shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-4 border-brand-950 shadow-lg ${
                        isKids
                          ? "bg-gradient-to-br from-kids-400 to-accent-pink"
                          : "bg-gradient-to-br from-brand-400 to-brand-600"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-widest ${
                            isKids ? "text-kids-300" : "text-brand-300"
                          }`}
                        >
                          {step.stage}
                        </span>
                        <span className="text-[10px] font-bold text-white/50 uppercase">
                          {step.age}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-white text-base mt-0.5">
                        {step.title}
                      </h3>
                      <p className="text-white/60 text-[13px] leading-snug mt-1">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ---------- DESKTOP: horizontal timeline ---------- */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[3.25rem] left-0 right-0 h-0.5 bg-gradient-to-r from-kids-400 via-brand-400 to-brand-300" />
          <div className="grid grid-cols-5 gap-4">
            {learningJourney.map((step, i) => {
              const Icon = icons[i] || GraduationCap;
              const isKids = step.brand === "kids";
              return (
                <ScrollReveal key={step.title} delay={i * 0.12}>
                  <div className="relative flex flex-col items-center text-center group">
                    <div
                      className={`relative z-10 w-[6.5rem] h-[6.5rem] rounded-full flex flex-col items-center justify-center mb-5 border-4 border-brand-950 shadow-xl transition-transform duration-300 group-hover:scale-105 ${
                        isKids
                          ? "bg-gradient-to-br from-kids-400 to-accent-pink"
                          : "bg-gradient-to-br from-brand-400 to-brand-600"
                      }`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                      <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider mt-1">
                        {step.age}
                      </span>
                      <motion.span
                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        className={`absolute inset-0 rounded-full border-2 ${
                          isKids ? "border-kids-300" : "border-brand-300"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-widest mb-1.5 ${
                        isKids ? "text-kids-300" : "text-brand-300"
                      }`}
                    >
                      {step.stage}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed px-2">
                      {step.detail}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12 lg:mt-16">
            <p className="text-white/70 mb-5 text-base md:text-lg">
              One institution. Every stage of your child&apos;s success.
            </p>
            <Link
              href="/admissions"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-brand-700 font-semibold shadow-xl hover:gap-3 transition-all duration-300"
            >
              Start the Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
