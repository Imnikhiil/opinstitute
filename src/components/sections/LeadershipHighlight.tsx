"use client";

import Image from "next/image";
import { Award, Briefcase, GraduationCap, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { leadership as staticLeadership, type Leader } from "@/data/leadership";
import { cn } from "@/lib/utils";

function Avatar({
  leader,
  size = "lg",
}: {
  leader: Leader;
  size?: "md" | "lg" | "xl";
}) {
  const dim =
    size === "xl"
      ? "w-28 h-28 sm:w-36 sm:h-36"
      : size === "lg"
        ? "w-20 h-20 sm:w-24 sm:h-24"
        : "w-14 h-14";
  const textSize =
    size === "xl" ? "text-3xl sm:text-4xl" : size === "lg" ? "text-2xl sm:text-3xl" : "text-lg";
  const sizesAttr = size === "xl" ? "144px" : size === "lg" ? "96px" : "56px";

  if (leader.image) {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden shadow-lg ring-4 ring-white dark:ring-gray-800 shrink-0",
          dim
        )}
      >
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          sizes={sizesAttr}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-display font-bold text-white shadow-lg shrink-0 ring-4 ring-white/80 dark:ring-gray-800",
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

function isFounder(leader: Leader) {
  return /founder/i.test(leader.title) || /om\s*prakash/i.test(leader.name);
}

/** Compact, professional founder message — portrait + quote + meta in one organised block */
function FounderFeature({ leader }: { leader: Leader }) {
  return (
    <ScrollReveal>
      <article className="relative overflow-hidden rounded-2xl border border-brand-200/70 dark:border-brand-800/60 bg-white dark:bg-gray-900 shadow-sm">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-600 via-brand-500 to-gold-500" />

        <div className="relative grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-6 p-5 sm:p-6 lg:p-7">
          {/* Portrait + identity */}
          <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 sm:w-[140px] shrink-0">
            <Avatar leader={leader} size="lg" />
            <div className="sm:text-center min-w-0">
              <p className="font-display text-base sm:text-lg font-bold text-[#1d2951] dark:text-white leading-tight">
                {leader.name}
              </p>
              <p className="text-brand-600 dark:text-brand-400 text-xs sm:text-sm font-semibold mt-0.5">
                {leader.title}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5 hidden sm:block">
                {leader.organization}
              </p>
              <div className="mt-2 flex flex-wrap sm:justify-center gap-1">
                {leader.credentials.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Message + meta */}
          <div className="min-w-0 flex flex-col">
            <div className="inline-flex items-center gap-1.5 mb-2.5">
              <Award className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                Message from the Founder
              </span>
            </div>

            <blockquote className="pl-3.5 border-l-2 border-brand-300 dark:border-brand-600">
              <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/80 dark:text-gray-200">
                {leader.message}
              </p>
            </blockquote>

            <div className="mt-auto pt-4 sm:pt-5">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-[13px] text-muted-foreground border-t border-gray-100 dark:border-white/10 pt-3.5">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                  <Briefcase className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  {leader.experience}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  {leader.education}
                </span>
                {leader.stats.map((stat) => (
                  <span
                    key={stat.label}
                    className="inline-flex items-center gap-1 font-medium text-foreground/80"
                  >
                    <span className="font-display font-bold text-brand-700 dark:text-brand-400">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground">{stat.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

function ManagementCard({ leader, delay = 0 }: { leader: Leader; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <article className="relative h-full overflow-hidden rounded-2xl border border-gold-200/80 dark:border-gold-800/40 bg-white dark:bg-gray-900 shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400" />

        <div className="flex items-start gap-3.5 p-5 sm:p-6 pt-6 sm:pt-7">
          <Avatar leader={leader} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] mb-0.5 text-gold-700 dark:text-gold-400">
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

        <div className="flex flex-wrap gap-1.5 px-5 sm:px-6 mt-1">
          {leader.credentials.map((c) => (
            <span
              key={c}
              className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold bg-gold-50 text-gold-800 dark:bg-gold-950/30 dark:text-gold-300"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 sm:px-6 mt-4">
          <div className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/70" />
            <div>
              <span className="block text-[10px] uppercase tracking-wide text-muted-foreground/70">
                Experience
              </span>
              <span className="text-sm font-semibold text-foreground">
                {leader.experience}
              </span>
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

        {leader.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 px-5 sm:px-6 mt-4">
            {leader.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-3 py-2.5 text-center bg-gold-50/80 dark:bg-gold-950/20"
              >
                <p className="font-display text-lg sm:text-xl font-bold text-gold-700 dark:text-gold-400">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="px-5 sm:px-6 py-5 mt-2">
          <div className="rounded-xl bg-gold-50/60 dark:bg-gold-950/20 p-4 border-l-4 border-gold-500">
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              &ldquo;{leader.message}&rdquo;
            </p>
          </div>
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
  const founder = data.find(isFounder);
  const others = data.filter((l) => !isFounder(l));

  return (
    <div>
      <ScrollReveal>
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      </ScrollReveal>

      <div className="space-y-6 lg:space-y-8">
        {founder ? (
          <FounderFeature leader={founder} />
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {data.map((leader, i) => (
              <ManagementCard key={leader.id} leader={leader} delay={i * 0.08} />
            ))}
          </div>
        )}

        {founder && others.length > 0 && (
          <div
            className={cn(
              "grid gap-6 lg:gap-8",
              others.length === 1 ? "max-w-2xl mx-auto w-full" : "md:grid-cols-2"
            )}
          >
            {others.map((leader, i) => (
              <ManagementCard key={leader.id} leader={leader} delay={i * 0.08} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Compact strip for home / about teasers — founder quote featured */
export function LeadershipStrip({ leaders }: { leaders?: Leader[] }) {
  const data = leaders && leaders.length > 0 ? leaders : staticLeadership;
  const founder = data.find(isFounder) ?? data[0];
  const others = data.filter((l) => l.id !== founder?.id);

  if (!founder) return null;

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-brand-200/70 dark:border-brand-800/50 bg-white dark:bg-gray-900 p-3.5 sm:p-4">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-600 to-gold-500" />
        <div className="flex items-start gap-3 pl-1">
          <Avatar leader={founder} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400 mb-0.5">
              {founder.title}
            </p>
            <p className="font-display font-bold text-sm text-[#1d2951] dark:text-white">
              {founder.name}
            </p>
            <p className="mt-1.5 text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
              &ldquo;{founder.message}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {others.map((leader) => (
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
