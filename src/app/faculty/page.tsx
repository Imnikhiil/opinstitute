import type { Metadata } from "next";
import Image from "next/image";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadershipHighlight } from "@/components/sections/LeadershipHighlight";
import { getFaculty } from "@/lib/supabase/public-data";
import { leadership } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet our leadership and expert faculty at OP Institute — Founder Om Prakash, Academic & Management Head Meenakshi, and our dedicated teaching team.",
};

export const revalidate = 60;

export default async function FacultyPage() {
  const allFaculty = await getFaculty();
  const leaderNames = new Set(
    leadership.map((l) => l.name.trim().toLowerCase())
  );
  // Leadership is featured separately; hide duplicates if added in admin
  const faculty = allFaculty.filter(
    (m) => !leaderNames.has(m.name.trim().toLowerCase())
  );

  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Our Faculty
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl">
            Led by our Founder and Management Head — supported by passionate
            educators dedicated to every student&apos;s success.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50/80 dark:bg-gray-900/30">
        <div className="container-custom">
          <LeadershipHighlight
            badge="Leadership"
            title="Founder & Management"
            subtitle="Om Prakash and Meenakshi — the faces that guide and run the institute"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Teaching Team"
              title="Meet Our Expert Teachers"
              subtitle="Faculty members can be updated anytime from the Admin Panel"
            />
          </ScrollReveal>

          {faculty.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              More faculty profiles will appear here as they are added from the
              Admin Panel.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.08}>
                  <div className="group glass-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-2">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg">
                        {member.name}
                      </h3>
                      <p className="text-brand-600 dark:text-brand-400 text-sm font-medium mt-0.5">
                        {member.subject}
                      </p>
                      <p className="text-muted-foreground text-xs mt-2">
                        {member.qualification}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Experience: {member.experience}
                      </p>
                      {member.social?.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="inline-flex items-center gap-1 mt-3 text-sm text-brand-600 hover:text-brand-700"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedinIcon className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
