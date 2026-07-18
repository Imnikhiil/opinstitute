"use client";

import { useEffect, useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  testimonials?: Testimonial[];
  filter?: "preschool" | "institute";
  badge?: string;
  title?: string;
  subtitle?: string;
  variant?: "default" | "kids";
  className?: string;
}

function useItemsPerView() {
  const [items, setItems] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setItems(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return items;
}

export function Testimonials({
  testimonials = fallbackTestimonials,
  filter,
  badge = "Testimonials",
  title = "What Parents & Students Say",
  subtitle = "Real stories from our OP Institute of Studies family",
  variant = "default",
  className,
}: TestimonialsProps) {
  const data = useMemo(
    () =>
      filter ? testimonials.filter((t) => t.category === filter) : testimonials,
    [filter, testimonials]
  );

  const itemsPerView = useItemsPerView();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, data.length - itemsPerView);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  useEffect(() => {
    if (paused || data.length <= itemsPerView) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, maxIndex, itemsPerView, data.length]);

  const isKids = variant === "kids";
  const accent = isKids ? "kids" : "brand";

  const prev = () => setIndex((p) => (p <= 0 ? maxIndex : p - 1));
  const next = () => setIndex((p) => (p >= maxIndex ? 0 : p + 1));

  return (
    <section
      className={cn(
        "section-padding overflow-hidden",
        !className && "bg-[#f5f5f7] dark:bg-gray-900/40",
        className
      )}
    >
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge={badge}
            title={title}
            subtitle={subtitle}
            variant={isKids ? "kids" : "default"}
          />
        </ScrollReveal>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track */}
          <div className="overflow-hidden px-1 py-2">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              {data.map((t) => (
                <div
                  key={t.id}
                  className="shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 px-3"
                >
                  <div className="premium-card p-6 h-full flex flex-col relative">
                    <Quote
                      className={cn(
                        "w-8 h-8 absolute top-5 right-5",
                        isKids
                          ? "text-kids-200 dark:text-kids-800"
                          : "text-brand-200 dark:text-brand-800"
                      )}
                    />
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-gold-400 text-gold-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={cn(
                            "w-11 h-11 rounded-full flex items-center justify-center font-semibold",
                            isKids
                              ? "bg-kids-100 dark:bg-kids-900 text-kids-600"
                              : "bg-brand-100 dark:bg-brand-900 text-brand-600"
                          )}
                        >
                          {t.name[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          {data.length > itemsPerView && (
            <>
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-90 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === index
                          ? isKids
                            ? "w-6 bg-kids-500"
                            : "w-6 bg-brand-500"
                          : "w-2 bg-gray-300 dark:bg-gray-600"
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-90 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
