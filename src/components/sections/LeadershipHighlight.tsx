"use client";

import Image from "next/image";
import { Award, Briefcase, GraduationCap, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { leadership as staticLeadership, type Leader } from "@/data/leadership";
import { cn } from "@/lib/utils";

function Avatar({ leader, size = "lg" }: { leader: Leader; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "w-20 h-20 sm:w-24 sm:h-24" : "w-14 h-14";
  const textSize = size === "lg" ? "text-2xl sm:text-3xl" : "text-lg";

  if (leader.image) {
    return (
      <div className={cn("relative rounded-full overflow-hidden shadow-lg ring-3 ring-gray-100 dark:ring-gray-800 shrink-0", dim)}>
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          sizes={size === "lg" ? "96px" : "56px"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-display font-bold text-white shadow-lg shrink-0",
        dim,
        textSize,
        leader.accent === "brand"
          ? "bg-gradient-to-br from-brand-500 to-brand-800"
          : "bg-gradient-to-br from-gold-400 to-gold-600"
      )}
    >
      {leader.initials}
    </div>
  );
}

function LeaderCard({ leader, delay = 0 }: { leader: Leader; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <article
        className={cn(
          "relative h-full overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 shadow-sm",
          leader.accent === "brand"
            ? "border-brand-200/80 dark:border-brand-800"
            : "border-gold-200/80 dark:border-gold-800/40"
        )}
      >
        {/* Top accent bar */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1",
            leader.accent === "brand"
              ? "bg-gradient-to-r from-brand-600 to-brand-400"
              : "bg-gradient-to-r from-gold-600 to-gold-400"
          )}
        />

        {/* Header: Avatar + Name + LinkedIn */}
        <div className="flex items-start gap-3.5 p-5 sm:p-6 pb-0 sm:pb-0 pt-6 sm:pt-7">
          <Avatar leader={leader} />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] mb-0.5",
                leader.accent === "brand"
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gold-700 dark:text-gold-400"
              )}
            >
              {leader.title}
            </p>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#1d2951] dark:text-white leading-tight">
              {leader.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {leader.organization}
            </p>
          </div>
        </div>

        {/* Credential tags */}
        <div className="flex flex-wrap gap-1.5 px-5 sm:px-6 mt-4">
          {leader.credentials.map((c) => (
            <span
              key={c}
              className={cn(
                "px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold",
                leader.accent === "brand"
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                  : "bg-gold-50 text-gold-800 dark:bg-gold-950/30 dark:text-gold-300"
              )}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Experience + Education row */}
        <div className="grid grid-cols-2 gap-3 px-5 sm:px-6 mt-4">
          <div className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/70" />
            <div>
              <span className="block text-[10px] uppercase tracking-wide text-muted-foreground/70">
                Experience
              </span>
              <span className="text-sm font-semibold text-foreground">{leader.experience}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            {leader.since ? (
              <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/70" />
            ) : (
              <GraduationCap className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/70" />
            )}
            <div>
              <span className="block text-[10px] uppercase tracking-wide text-muted-foreground/70">
                {leader.since ? "Since" : "Education"}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {leader.since || leader.education}
              </span>
            </div>
          </div>
        </div>

        {/* Stats boxes */}
        {leader.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 px-5 sm:px-6 mt-4">
            {leader.stats.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-center",
                  leader.accent === "brand"
                    ? "bg-brand-50/80 dark:bg-brand-950/30"
                    : "bg-gold-50/80 dark:bg-gold-950/20"
                )}
              >
                <p
                  className={cn(
                    "font-display text-lg sm:text-xl font-bold",
                    leader.accent === "brand"
                      ? "text-brand-700 dark:text-brand-400"
                      : "text-gold-700 dark:text-gold-400"
                  )}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quote */}
        <div className="px-5 sm:px-6 py-5 mt-3">
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm italic">
            &ldquo;{leader.message}&rdquo;
          </p>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function LeadershipHighlight({
  title = "Our Leadership",
  subtitle = "The people who guide OP Institute and OP Kids every day",
  badge = "Leadership",
  leaders,
}: {
  title?: string;
  subtitle?: string;
  badge?: string;
  leaders?: Leader[];
}) {
  const data = leaders && leaders.length > 0 ? leaders : staticLeadership;

  return (
    <div>
      <ScrollReveal>
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      </ScrollReveal>

      <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Award className="w-4 h-4 text-brand-600" />
        <span>Founder & Management — highlighted with care</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {data.map((leader, i) => (
          <LeaderCard key={leader.id} leader={leader} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

/** Compact strip for home / about teasers */
export function LeadershipStrip({ leaders }: { leaders?: Leader[] }) {
  const data = leaders && leaders.length > 0 ? leaders : staticLeadership;

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {data.map((leader) => (
        <div
          key={leader.id}
          className="flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-white/10 p-3.5"
        >
          <Avatar leader={leader} size="md" />
          <div className="min-w-0">
            <p className="font-display font-bold text-sm text-[#1d2951] dark:text-white truncate">
              {leader.name}
            </p>
            <p className="text-xs text-brand-600 dark:text-brand-400 font-medium truncate">
              {leader.title}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {leader.credentials.slice(0, 3).join(" · ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
