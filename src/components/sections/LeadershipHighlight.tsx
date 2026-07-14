"use client";

import { Award, Briefcase, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { leadership, type Leader } from "@/data/leadership";
import { cn } from "@/lib/utils";

function Avatar({ leader, size = "lg" }: { leader: Leader; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "w-20 h-20 text-2xl" : "w-14 h-14 text-lg";
  return (
    <div
      className={cn(
        "rounded-2xl flex items-center justify-center font-display font-bold text-white shadow-md shrink-0",
        dim,
        leader.accent === "brand"
          ? "bg-gradient-to-br from-brand-600 to-brand-900"
          : "bg-gradient-to-br from-gold-500 to-gold-700"
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
          "relative h-full overflow-hidden rounded-3xl border bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm",
          leader.accent === "brand"
            ? "border-brand-200/80 dark:border-brand-800"
            : "border-gold-200/80 dark:border-gold-800/40"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1.5",
            leader.accent === "brand"
              ? "bg-gradient-to-r from-brand-600 to-brand-400"
              : "bg-gradient-to-r from-gold-600 to-gold-400"
          )}
        />

        <div className="flex items-start gap-4 mb-5">
          <Avatar leader={leader} />
          <div className="min-w-0 pt-0.5">
            <p
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.16em] mb-1",
                leader.accent === "brand"
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gold-700 dark:text-gold-400"
              )}
            >
              {leader.title}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1d2951] dark:text-white leading-tight">
              {leader.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {leader.organization}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {leader.credentials.map((c) => (
            <span
              key={c}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-semibold",
                leader.accent === "brand"
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                  : "bg-gold-50 text-gold-800 dark:bg-gold-950/30 dark:text-gold-300"
              )}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-sm">
          <div className="flex items-start gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <span className="block text-[11px] uppercase tracking-wide text-muted-foreground/80">
                Experience
              </span>
              <span className="text-foreground font-medium">{leader.experience}</span>
            </span>
          </div>
          <div className="flex items-start gap-2 text-muted-foreground">
            <GraduationCap className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <span className="block text-[11px] uppercase tracking-wide text-muted-foreground/80">
                Focus
              </span>
              <span className="text-foreground font-medium">{leader.focus}</span>
            </span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
          &ldquo;{leader.message}&rdquo;
        </p>
      </article>
    </ScrollReveal>
  );
}

export function LeadershipHighlight({
  title = "Our Leadership",
  subtitle = "The people who guide OP Institute and OP Kids every day",
  badge = "Leadership",
}: {
  title?: string;
  subtitle?: string;
  badge?: string;
}) {
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
        {leadership.map((leader, i) => (
          <LeaderCard key={leader.id} leader={leader} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

/** Compact strip for home / about teasers */
export function LeadershipStrip() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {leadership.map((leader) => (
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
