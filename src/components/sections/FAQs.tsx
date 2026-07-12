"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FAQs() {
  const [openId, setOpenId] = useState<string | null>("1");

  return (
    <section className="section-padding bg-[#f5f5f7] dark:bg-gray-900/40">
      <div className="container-custom max-w-3xl">
        <ScrollReveal>
          <SectionHeader
            badge="FAQs"
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about admissions and programs"
          />
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={faq.id} delay={index * 0.05}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 shrink-0 text-brand-500 transition-transform",
                      openId === faq.id && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
