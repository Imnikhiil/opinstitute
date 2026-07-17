"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  MessageSquareQuote,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadershipHighlight } from "@/components/sections/LeadershipHighlight";
import {
  facultyCategories,
  facultyCategoryLabels,
  type FacultyCategory,
  type FacultyMember,
} from "@/data/faculty";
import type { Leader } from "@/data/leadership";
import { cn } from "@/lib/utils";

type FilterId = "all" | FacultyCategory;

function parseCategory(value: string | null | undefined): FilterId {
  if (value === "preschool" || value === "institute") return value;
  return "all";
}

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <div className="group glass-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 rounded-2xl h-full">
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

      <div className="px-5 py-4 space-y-3 text-sm">
        {member.qualification && (
          <div className="flex items-start gap-3">
            <GraduationCap className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="flex-1 flex justify-between gap-2">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Qualification
              </span>
              <span className="font-medium text-xs sm:text-sm text-right">
                {member.qualification}
              </span>
            </div>
          </div>
        )}
        {(member.subjects_taught || member.subject) && (
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="flex-1 flex justify-between gap-2">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Subjects taught
              </span>
              <span className="font-medium text-xs sm:text-sm text-right">
                {member.subjects_taught || member.subject}
              </span>
            </div>
          </div>
        )}
        {member.batch_handled && (
          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="flex-1 flex justify-between gap-2">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Batch handled
              </span>
              <span className="font-medium text-xs sm:text-sm text-right">
                {member.batch_handled}
              </span>
            </div>
          </div>
        )}
        {member.experience && (
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="flex-1 flex justify-between gap-2">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Experience
              </span>
              <span className="font-medium text-xs sm:text-sm text-right">
                {member.experience}
              </span>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
}

function FacultyGrid({ members }: { members: FacultyMember[] }) {
  if (members.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No teachers listed in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {members.map((member, index) => (
        <ScrollReveal key={member.id} delay={index * 0.08}>
          <FacultyCard member={member} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function FacultyPageClient({
  faculty,
  leaders,
  initialCategory = "all",
}: {
  faculty: FacultyMember[];
  leaders: Leader[];
  initialCategory?: FilterId;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = parseCategory(
    searchParams.get("category") ?? initialCategory
  );

  const setCategory = useCallback(
    (next: FilterId) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "all") {
        params.delete("category");
      } else {
        params.set("category", next);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const preschool = useMemo(
    () => faculty.filter((m) => m.category === "preschool"),
    [faculty]
  );
  const institute = useMemo(
    () => faculty.filter((m) => m.category === "institute"),
    [faculty]
  );

  const showAll = activeCategory === "all";
  const empty = faculty.length === 0;

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
            leaders={leaders}
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Teaching Team"
              title="Meet Our Expert Teachers"
              subtitle="Dedicated educators committed to academic excellence and student success"
            />
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
            {facultyCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? cat.id === "preschool"
                      ? "bg-kids-500 text-white"
                      : "bg-brand-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {empty ? (
            <p className="text-center text-muted-foreground py-10">
              More faculty profiles will appear here as they are added from the
              Admin Panel.
            </p>
          ) : showAll ? (
            <div className="space-y-12 sm:space-y-14">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-kids-600 dark:text-kids-400 mb-5 sm:mb-6 tracking-wide">
                  {facultyCategoryLabels.preschool}
                </h2>
                <FacultyGrid members={preschool} />
              </div>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-700 dark:text-brand-400 mb-5 sm:mb-6 tracking-wide">
                  {facultyCategoryLabels.institute}
                </h2>
                <FacultyGrid members={institute} />
              </div>
            </div>
          ) : (
            <div>
              <h2
                className={cn(
                  "font-display text-xl sm:text-2xl font-bold mb-5 sm:mb-6 tracking-wide",
                  activeCategory === "preschool"
                    ? "text-kids-600 dark:text-kids-400"
                    : "text-brand-700 dark:text-brand-400"
                )}
              >
                {facultyCategoryLabels[activeCategory]}
              </h2>
              <FacultyGrid
                members={
                  activeCategory === "preschool" ? preschool : institute
                }
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
