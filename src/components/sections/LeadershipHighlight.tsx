"use client";

import Image from "next/image";
import { Award, Briefcase, GraduationCap, Clock, Quote } from "lucide-react";
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

/** Large featured block — Founder & Director message takes center stage */
function FounderFeature({ leader }: { leader: Leader }) {
  return (
    <ScrollReveal>
      <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white shadow-premium">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-60" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold-400/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-brand-400/20 blur-3xl" />

        <div className="relative grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10">
          {/* Message column — primary */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gold-300">
                <Award className="w-3.5 h-3.5" />
                Message from the Founder
              </span>
            </div>

            <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-gold-400/50 mb-3 sm:mb-4" />

            <blockquote className="font-display text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-white/95">
              {leader.message}
            </blockquote>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/15">
              <p className="font-display text-xl sm:text-2xl font-bold text-white">
                {leader.name}
              </p>
              <p className="text-gold-300 font-semibold text-sm sm:text-base mt-0.5">
                {leader.title}
              </p>
              <p className="text-white/60 text-sm mt-1">{leader.organization}</p>
            </div>

            {leader.stats.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                {leader.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-4 py-3 text-center backdrop-blur-sm"
                  >
                    <p className="font-display text-2xl font-bold text-gold-300">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/70 font-medium mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Portrait / credentials column */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end justify-center">
            <div className="relative flex flex-col items-center text-center lg:text-right w-full max-w-sm">
              <Avatar leader={leader} size="xl" />
              <div className="mt-5 flex flex-wrap justify-center lg:justify-end gap-1.5">
                {leader.credentials.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-[11px] font-semibold text-white/90"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 w-full">
                <div className="rounded-2xl bg-white/8 ring-1 ring-white/12 px-3 py-3 text-center">
                  <Briefcase className="w-4 h-4 mx-auto text-gold-300/80 mb-1" />
                  <span className="block text-[10px] uppercase tracking-wide text-white/50">
                    Experience
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {leader.experience}
                  </span>
                </div>
                <div className="rounded-2xl bg-white/8 ring-1 ring-white/12 px-3 py-3 text-center">
                  <GraduationCap className="w-4 h-4 mx-auto text-gold-300/80 mb-1" />
                  <span className="block text-[10px] uppercase tracking-wide text-white/50">
                    Education
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {leader.education}
                  </span>
                </div>
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-4 sm:p-5 text-white shadow-md">
        <Quote className="absolute top-3 right-3 w-8 h-8 text-gold-400/30" />
        <div className="flex items-start gap-3.5">
          <Avatar leader={founder} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300 mb-1">
              {founder.title}
            </p>
            <p className="font-display font-bold text-base text-white">
              {founder.name}
            </p>
            <p className="mt-2 text-sm text-white/85 leading-relaxed line-clamp-3">
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
