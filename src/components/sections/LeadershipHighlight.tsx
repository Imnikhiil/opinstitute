"use client";

import Image from "next/image";
import { Award, Briefcase, GraduationCap, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { leadership as staticLeadership, type Leader } from "@/data/leadership";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
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
      ? "w-32 h-32 sm:w-40 sm:h-40"
      : size === "lg"
        ? "w-28 h-28 sm:w-32 sm:h-32"
        : "w-14 h-14";
  const textSize =
    size === "xl"
      ? "text-3xl sm:text-4xl"
      : size === "lg"
        ? "text-2xl sm:text-3xl"
        : "text-lg";
  const sizesAttr = size === "xl" ? "160px" : size === "lg" ? "128px" : "56px";

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
          quality={90}
          sizes={sizesAttr}
          className="object-cover object-center"
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

function isKidsManagementLeader(leader: Leader) {
  const org = leader.organization.toLowerCase();
  return (
    org.includes("kids") ||
    org.includes("preschool") ||
    /mona/i.test(leader.name)
  );
}

function isInstituteManagementLeader(leader: Leader) {
  const org = leader.organization.toLowerCase();
  return (
    (/institute/i.test(org) && !/kids|preschool/i.test(org)) ||
    /meenakshi/i.test(leader.name)
  );
}

/** Compact, professional founder message — portrait + quote + meta in one organised block */
function FounderFeature({ leader }: { leader: Leader }) {
  return (
    <ScrollReveal>
      <article className="relative overflow-hidden rounded-2xl border border-brand-200/70 dark:border-brand-800/60 bg-white dark:bg-gray-900 shadow-sm">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-600 via-brand-500 to-gold-500" />

        <div className="relative grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-6 p-5 sm:p-6 lg:p-7">
          {/* Portrait + identity */}
          <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 sm:w-[168px] shrink-0">
            <Avatar leader={leader} size="xl" />
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
  const isBrand = leader.accent === "brand";
  const isKids = !isBrand;

  return (
    <ScrollReveal delay={delay}>
      <article
        className={cn(
          "relative h-full overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 shadow-sm",
          isBrand
            ? "border-brand-200/80 dark:border-brand-800/50"
            : "border-kids-200/70 dark:border-kids-800/40"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-0.5",
            isBrand
              ? "bg-gradient-to-r from-brand-600 to-brand-400"
              : "bg-gradient-to-r from-kids-500 to-accent-pink"
          )}
        />

        <div className="relative grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-5 p-4 sm:p-5">
          {/* Portrait */}
          <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:w-[120px] shrink-0">
            <Avatar leader={leader} size="lg" />
            <div className="sm:text-center min-w-0 sm:hidden">
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.12em]",
                  isKids
                    ? "text-kids-600 dark:text-kids-400"
                    : "text-brand-600 dark:text-brand-400"
                )}
              >
                {leader.organization}
              </p>
              <h3 className="font-display text-base font-bold text-[#1d2951] dark:text-white leading-tight">
                {leader.name}
              </h3>
              <p
                className={cn(
                  "text-[11px] font-semibold mt-0.5",
                  isKids
                    ? "text-gold-700 dark:text-gold-400"
                    : "text-brand-600 dark:text-brand-400"
                )}
              >
                {leader.title}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0 flex flex-col">
            <div className="hidden sm:block">
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5",
                  isKids
                    ? "text-kids-600 dark:text-kids-400"
                    : "text-brand-600 dark:text-brand-400"
                )}
              >
                {leader.organization}
              </p>
              <h3 className="font-display text-lg font-bold text-[#1d2951] dark:text-white leading-tight">
                {leader.name}
              </h3>
              <p
                className={cn(
                  "text-xs font-semibold mt-0.5",
                  isKids
                    ? "text-gold-700 dark:text-gold-400"
                    : "text-brand-600 dark:text-brand-400"
                )}
              >
                {leader.title}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 mt-2.5">
              {leader.credentials.map((c) => (
                <span
                  key={c}
                  className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-semibold",
                    isBrand
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                      : "bg-kids-50 text-kids-700 dark:bg-kids-950/30 dark:text-kids-300"
                  )}
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                <Briefcase className="w-3.5 h-3.5 shrink-0 opacity-60" />
                {leader.experience}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                {leader.since ? (
                  <Clock className="w-3.5 h-3.5 shrink-0 opacity-60" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 shrink-0 opacity-60" />
                )}
                {leader.since || leader.education}
              </span>
            </div>

            {leader.stats.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {leader.stats.map((stat) => (
                  <span
                    key={stat.label}
                    className={cn(
                      "inline-flex items-baseline gap-1 rounded-lg px-2.5 py-1.5 text-xs",
                      isBrand
                        ? "bg-brand-50/90 dark:bg-brand-950/30"
                        : "bg-kids-50/90 dark:bg-kids-950/25"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display font-bold text-sm",
                        isBrand
                          ? "text-brand-700 dark:text-brand-400"
                          : "text-kids-700 dark:text-kids-400"
                      )}
                    >
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground">{stat.label}</span>
                  </span>
                ))}
              </div>
            )}

            <blockquote
              className={cn(
                "mt-3 sm:mt-4 pl-3 border-l-[3px]",
                isBrand
                  ? "border-brand-400 dark:border-brand-500"
                  : "border-kids-400 dark:border-kids-500"
              )}
            >
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/75 dark:text-gray-300 line-clamp-4 sm:line-clamp-5">
                &ldquo;{leader.message}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

function sortManagementHeads(leaders: Leader[]) {
  const rank = (l: Leader) => {
    const org = l.organization.toLowerCase();
    if (org.includes("kids") || org.includes("preschool")) return 0;
    if (org.includes("institute")) return 1;
    return 2;
  };
  return [...leaders].sort((a, b) => rank(a) - rank(b));
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
  const { brand, isKids, isInstitute } = useSiteBrand();
  const data = leaders && leaders.length > 0 ? leaders : staticLeadership;
  const founder = data.find(isFounder);
  const others = sortManagementHeads(
    data.filter((l) => {
      if (isFounder(l)) return false;
      if (brand === "preschool") return isKidsManagementLeader(l);
      if (brand === "institute") return isInstituteManagementLeader(l);
      return true;
    })
  );

  const resolvedSubtitle = isKids
    ? "Founder Om Prakash and the leadership of OP Kids Pre School"
    : isInstitute
      ? "Founder Om Prakash and the leadership of OP Institute of Studies"
      : subtitle;

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          badge={badge}
          title={title}
          subtitle={resolvedSubtitle}
        />
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
              "grid gap-4 sm:gap-5",
              others.length === 1
                ? "max-w-3xl mx-auto w-full"
                : "md:grid-cols-2"
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

/** Compact strip for home / about teasers — founder quote + management heads */
export function LeadershipStrip({ leaders }: { leaders?: Leader[] }) {
  const data = leaders && leaders.length > 0 ? leaders : staticLeadership;
  const founder = data.find(isFounder) ?? data[0];
  const others = sortManagementHeads(data.filter((l) => l.id !== founder?.id));

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

      <div
        className={cn(
          "grid gap-3",
          others.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
        )}
      >
        {others.map((leader) => (
          <div
            key={leader.id}
            className="flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-white/10 p-3.5"
          >
            <Avatar leader={leader} size="md" />
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.1em] truncate",
                  leader.accent === "brand"
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-kids-600 dark:text-kids-400"
                )}
              >
                {leader.organization}
              </p>
              <p className="font-display font-bold text-sm text-[#1d2951] dark:text-white truncate">
                {leader.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {leader.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
