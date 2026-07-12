"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Testimonials"
            title="What Parents & Students Say"
            subtitle="Real stories from our OP Institute family"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.id} delay={index * 0.1}>
              <div className="glass-card p-6 h-full flex flex-col hover:shadow-card-hover transition-shadow relative">
                <Quote className="w-8 h-8 text-brand-200 dark:text-brand-800 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-kids-400 text-kids-400" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 font-semibold">
                      {t.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
