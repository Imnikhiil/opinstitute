import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadershipHighlight } from "@/components/sections/LeadershipHighlight";
import { aboutContent } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about OP Institute of Studies — our history, vision, mission, and values. Meet Founder Om Prakash and Academic & Management Head Meenakshi.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            About Us
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
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
              <div className="rounded-2xl overflow-hidden shadow-premium">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80"
                  alt="OP Institute history"
                  width={600}
                  height={400}
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-8 h-full">
                <span className="text-brand-600 font-semibold text-sm">Vision</span>
                <h2 className="font-display text-2xl font-bold mt-2 mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutContent.vision}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 h-full">
                <span className="text-brand-600 font-semibold text-sm">Mission</span>
                <h2 className="font-display text-2xl font-bold mt-2 mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutContent.mission}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <LeadershipHighlight
            badge="Leadership"
            title="Messages from Our Leaders"
            subtitle="Founder Om Prakash and Meenakshi — the team that leads and manages OP Institute every day"
          />
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader badge="Values" title="Our Core Values" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutContent.values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="glass-card p-6 hover:shadow-card-hover transition-shadow">
                  <h3 className="font-display font-semibold text-lg text-brand-600 dark:text-brand-400 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
