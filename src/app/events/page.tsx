import type { Metadata } from "next";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEvents } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events at OP Institute of Studies — academic programs, cultural celebrations, sports day, and OP Kids Pre School activities.",
};

export const revalidate = 60;

const typeColors: Record<string, string> = {
  academic: "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300",
  cultural: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  sports: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  preschool: "bg-kids-100 text-kids-700 dark:bg-kids-900/30 dark:text-kids-300",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-3 sm:mb-4">
            Events & Activities
          </h1>
          <p className="text-[#666666] text-base sm:text-lg max-w-2xl">
            Stay updated with our academic programs, celebrations, and campus activities.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <SectionHeader badge="Timeline" title="Our Events" />
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 dark:bg-brand-800 md:-translate-x-px" />

            {events.map((event, index) => (
              <ScrollReveal key={event.id} delay={index * 0.1}>
                <div
                  className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand-500 border-4 border-white dark:border-gray-950 -translate-x-1/2 mt-6 z-10" />

                  <div className="md:w-1/2 pl-12 md:pl-0">
                    <div className="glass-card overflow-hidden hover:shadow-card-hover transition-shadow">
                      <div className="relative h-40 sm:h-48">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${typeColors[event.type]}`}
                          >
                            {event.type}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
