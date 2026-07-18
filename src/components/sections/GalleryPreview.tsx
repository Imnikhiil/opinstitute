"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import type { GalleryImage } from "@/data/gallery";

export function GalleryPreview({ images }: { images: GalleryImage[] }) {
  const preview = images.slice(0, 6);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge="Gallery"
            title="Life at OP Institute of Studies"
            subtitle="Glimpses of learning, celebrations, and achievements"
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
          {preview.map((img, index) => (
            <ScrollReveal key={img.id} delay={index * 0.05}>
              <div
                className={`relative rounded-2xl overflow-hidden group ${
                  index === 0 ? "md:row-span-2 md:col-span-1" : ""
                }`}
              >
                <div className={`relative ${index === 0 ? "aspect-[3/4] md:aspect-auto md:h-full min-h-[200px]" : "aspect-square"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/gallery">
              <Button variant="outline">
                View Full Gallery
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
