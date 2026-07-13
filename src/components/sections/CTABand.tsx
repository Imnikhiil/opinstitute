"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, CalendarCheck } from "lucide-react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTABand() {
  const siteConfig = useSiteConfig();

  return (
    <section className="relative overflow-hidden bg-accent-gradient animate-gradient-x">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-10 right-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
      />

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <ScrollReveal direction="left">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider mb-4">
                <CalendarCheck className="w-4 h-4" />
                Admissions Open 2025–26
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
                Ready to Begin Your <br className="hidden md:block" />
                Learning Journey?
              </h2>
              <p className="mt-4 text-white/85 text-base md:text-lg max-w-xl">
                From OP Kids Pre School to CMA & B.Com — take the first
                step today. Talk to our team for a free counselling session.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/admissions"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-brand-700 font-semibold shadow-xl hover:gap-3 transition-all duration-300"
              >
                Apply for Admission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I would like to enquire about admissions at OP Institute.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-[#25D366] text-white font-semibold shadow-lg hover:brightness-105 active:scale-95 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white font-semibold hover:bg-white/25 active:scale-95 transition"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
