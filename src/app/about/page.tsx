import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadershipHighlight } from "@/components/sections/LeadershipHighlight";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { aboutContent } from "@/data/site";
import {
  getFrontDeskPhoto,
  getLeadership,
  getVideos,
} from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about OP Institute of Studies — our history, vision, mission, and values. Meet Founder Om Prakash and Academic & Management Head Meenakshi.",
  alternates: { canonical: "/about" },
};

export const revalidate = 60;

export default async function AboutPage() {
  const [leaders, frontDeskPhoto, founderVideos] = await Promise.all([
    getLeadership(),
    getFrontDeskPhoto(),
    getVideos({ kind: "founder" }),
  ]);

  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-3 sm:mb-4">
            About Us
          </h1>
          <p className="text-[#666666] text-base sm:text-lg max-w-2xl">
            Discover our journey, values, and the people behind OP Institute of
            Studies & OP Kids Pre School.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <SectionHeader
                badge="Our Story"
                title="Institute History"
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed">
                {aboutContent.history}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
                <Image
                  src={frontDeskPhoto.src}
                  alt={frontDeskPhoto.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50/80 dark:bg-gray-900/30">
        <div className="container-custom">
          <LeadershipHighlight
            badge="Leadership"
            title="A Message from Our Founder"
            subtitle="Founder Om Prakash, with Academic & Management Heads for OP Kids Pre School and OP Institute of Studies"
            leaders={leaders}
          />
        </div>
      </section>

      <VideoShowcase
        videos={founderVideos}
        badge="Watch"
        title="Message from Our Founder"
        subtitle="Hear directly from Founder Om Prakash"
        className="bg-white dark:bg-transparent"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-5 sm:p-8 h-full">
                <span className="text-brand-600 font-semibold text-sm">
                  Vision
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold mt-2 mb-3 sm:mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutContent.vision}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-5 sm:p-8 h-full">
                <span className="text-brand-600 font-semibold text-sm">
                  Mission
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold mt-2 mb-3 sm:mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutContent.mission}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader badge="Values" title="Our Core Values" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aboutContent.values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="glass-card p-5 sm:p-6 hover:shadow-card-hover transition-shadow">
                  <h3 className="font-display font-semibold text-lg text-brand-600 dark:text-brand-400 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
