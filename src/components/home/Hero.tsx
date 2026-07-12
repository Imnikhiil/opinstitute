"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-600 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Admissions Open 2025-26
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 leading-tight text-balance">
              Where Excellence Meets{" "}
              <span className="text-brand-500">Early Learning</span>
            </h1>

            <p className="mt-6 text-lg text-[#666666] max-w-xl leading-relaxed">
              {siteConfig.tagline}. From joyful preschool experiences at{" "}
              <strong className="text-brand-600">OP Kids</strong> to competitive
              exam mastery — we nurture every stage of your child&apos;s journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/admissions">
                <Button size="lg">
                  Start Admission
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/op-kids">
                <Button size="lg" variant="outline">
                  Explore OP Kids
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold text-brand-900">20+</p>
                <p className="text-[#666666] text-sm">Years Since 2003</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-brand-900">5000+</p>
                <p className="text-[#666666] text-sm">Happy Students</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-brand-900">98%</p>
                <p className="text-[#666666] text-sm">Success Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-card">
                    <Image
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80"
                      alt="OP Kids preschool children learning"
                      width={300}
                      height={280}
                      className="w-full h-56 object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-card">
                    <Image
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80"
                      alt="Students at OP Institute"
                      width={300}
                      height={280}
                      className="w-full h-56 object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-brand-400 text-white rounded-xl px-5 py-4 shadow-premium max-w-[220px]"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Admissions Open</p>
                    <p className="text-white/90 text-xs mt-1">
                      Enroll now for 2025-26 session
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
