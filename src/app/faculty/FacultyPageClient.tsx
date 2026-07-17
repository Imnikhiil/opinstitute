"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadershipHighlight } from "@/components/sections/LeadershipHighlight";
import {
  facultyCategories,
  facultyCategoryLabels,
  FACULTY_PHOTO_ASPECT,
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
    <div className="group glass-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-0.5 rounded-xl h-full flex flex-col max-w-[220px] w-full mx-auto">
      {/* Same ratio as admin crop (4:5) so faces match upload */}
      <div
        className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
        style={{ aspectRatio: String(FACULTY_PHOTO_ASPECT) }}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          quality={90}
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col flex-1 p-2.5 sm:p-3">
        <h3 className="font-display font-bold text-[13px] sm:text-sm text-[#1d2951] dark:text-white leading-snug">
          {member.name}
        </h3>
        {(member.department || member.subject) && (
          <p className="text-brand-600 dark:text-brand-400 text-[11px] sm:text-xs font-medium mt-0.5 line-clamp-1">
            {member.department || member.subject}
          </p>
        )}
        <p className="text-muted-foreground text-[10px] sm:text-[11px] mt-1 leading-snug line-clamp-2">
          {[member.qualification, member.experience && `Experience: ${member.experience}`]
            .filter(Boolean)
            .join(", ")}
        </p>

        {member.achievement && (
          <span className="mt-1.5 self-start inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] font-semibold">
            {member.achievement}
          </span>
        )}

        {(member.subjects_taught || member.batch_handled) && (
          <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-white/10 space-y-0.5 text-[10px] sm:text-[11px] text-muted-foreground">
            {member.subjects_taught && (
              <p className="line-clamp-1">
                <span className="font-medium text-foreground/70">Subjects: </span>
                {member.subjects_taught}
              </p>
            )}
            {member.batch_handled && (
              <p className="line-clamp-1">
                <span className="font-medium text-foreground/70">Batch: </span>
                {member.batch_handled}
              </p>
            )}
          </div>
        )}

        {member.quote && (
          <p className="mt-1.5 text-[10px] sm:text-[11px] text-muted-foreground italic leading-snug line-clamp-2">
            &ldquo;{member.quote}&rdquo;
          </p>
        )}
      </div>
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
      {members.map((member, index) => (
        <ScrollReveal key={member.id} delay={index * 0.05} className="w-full flex justify-center">
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
            title="A Message from Our Founder"
            subtitle="Founder & Director Om Prakash — and the leadership behind our teaching team"
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
