import type { Metadata } from "next";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  MessageSquareQuote,
  ArrowUpRight,
} from "lucide-react";
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
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-3 sm:mb-4">
            Our Faculty
          </h1>
          <p className="text-[#666666] text-base sm:text-lg max-w-2xl">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {faculty.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.08}>
                  <div className="group glass-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 rounded-2xl">
                    {/* Avatar + Name header */}
                    <div className="flex flex-col items-center pt-6 pb-4 px-5 border-b border-gray-100 dark:border-white/10">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-brand-100 dark:ring-brand-900/40 shadow-md mb-3">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-center">
                        {member.name}
                      </h3>
                      {(member.department || member.subject) && (
                        <p className="text-brand-600 dark:text-brand-400 text-sm font-medium mt-0.5 text-center">
                          {member.department || member.subject}
                        </p>
                      )}
                      {member.achievement && (
                        <span className="mt-2 inline-block px-3 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                          {member.achievement}
                        </span>
                      )}
                    </div>

                    {/* Details table */}
                    <div className="px-5 py-4 space-y-3 text-sm">
                      {member.qualification && (
                        <div className="flex items-start gap-3">
                          <GraduationCap className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div className="flex-1 flex justify-between gap-2">
                            <span className="text-muted-foreground text-xs sm:text-sm">Qualification</span>
                            <span className="font-medium text-xs sm:text-sm text-right">{member.qualification}</span>
                          </div>
                        </div>
                      )}
                      {(member.subjects_taught || member.subject) && (
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div className="flex-1 flex justify-between gap-2">
                            <span className="text-muted-foreground text-xs sm:text-sm">Subjects taught</span>
                            <span className="font-medium text-xs sm:text-sm text-right">{member.subjects_taught || member.subject}</span>
                          </div>
                        </div>
                      )}
                      {member.batch_handled && (
                        <div className="flex items-start gap-3">
                          <Users className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div className="flex-1 flex justify-between gap-2">
                            <span className="text-muted-foreground text-xs sm:text-sm">Batch handled</span>
                            <span className="font-medium text-xs sm:text-sm text-right">{member.batch_handled}</span>
                          </div>
                        </div>
                      )}
                      {member.experience && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div className="flex-1 flex justify-between gap-2">
                            <span className="text-muted-foreground text-xs sm:text-sm">Experience</span>
                            <span className="font-medium text-xs sm:text-sm text-right">{member.experience}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quote */}
                    {member.quote && (
                      <div className="px-5 pb-4">
                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                          <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed flex gap-2">
                            <MessageSquareQuote className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-400" />
                            {member.quote}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* LinkedIn footer */}
                    {member.social?.linkedin && (
                      <div className="px-5 pb-5 pt-1">
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedinIcon className="w-4 h-4" />
                          LinkedIn
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
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
