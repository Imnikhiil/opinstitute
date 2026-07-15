"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { facilities } from "@/data/site";

export function Facilities() {
  return (
    <section className="section-padding bg-[#f5f5f7] dark:bg-gray-900/50">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Facilities"
            title="World-Class Infrastructure"
            subtitle="Modern facilities designed for effective learning and holistic development"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {facilities.map((facility, index) => (
            <ScrollReveal key={facility.title} delay={index * 0.08}>
              <div className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-xl text-white mb-1">
                    {facility.title}
                  </h3>
                  <p className="text-white/80 text-sm">{facility.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
