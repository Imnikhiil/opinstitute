import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Calendar, Home, Megaphone } from "lucide-react";
import {
  findAnnouncementForSlug,
  getEvents,
} from "@/lib/supabase/public-data";
import { matchEventSlug, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function titleFromSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const announcement = await findAnnouncementForSlug(slug);
  const title = announcement?.title || titleFromSlug(slug);
  return {
    title,
    description:
      announcement?.message ||
      `Details about ${title} at OP Kids Pre School / OP Institute.`,
  };
}

/**
 * /events/parent-orientation
 * 1) Matching event album → open it on /events
 * 2) Matching announcement (even future) → nice preview page (no 404)
 * 3) Unknown slug → soft “coming soon” with the name from the URL
 */
export default async function EventSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const events = await getEvents();
  const eventMatch = matchEventSlug(events, slug);

  if (eventMatch) {
    redirect(`/events?event=${encodeURIComponent(slugify(eventMatch.title) || slug)}`);
  }

  const announcement = await findAnnouncementForSlug(slug);
  const heading = announcement?.title || titleFromSlug(slug);
  const message =
    announcement?.message ||
    "This notice is coming up. Check back soon for photos, date confirmation, and full details — or contact us to learn more.";
  const isScheduled =
    Boolean(announcement?.startsOn) &&
    announcement!.startsOn >
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());

  const ctaHref =
    announcement?.linkUrl &&
    !announcement.linkUrl.includes(`/events/${slug}`)
      ? announcement.linkUrl
      : "/admissions";
  const ctaLabel =
    announcement?.linkLabel &&
    announcement.linkUrl &&
    !announcement.linkUrl.includes(`/events/${slug}`)
      ? announcement.linkLabel
      : "Enquire / Apply";

  return (
    <section className="section-padding min-h-[70vh] flex items-center">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900 shadow-card overflow-hidden">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-6 sm:px-8 pt-7 pb-6 text-white">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/20 rounded-full px-3 py-1">
              <Megaphone className="w-3.5 h-3.5" />
              {isScheduled ? "Upcoming notice" : "Notice"}
            </span>
            <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold leading-tight">
              {heading}
            </h1>
            {(announcement?.startsOn || announcement?.endsOn) && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/85">
                <Calendar className="w-4 h-4 shrink-0" />
                {announcement.startsOn && announcement.endsOn
                  ? `${announcement.startsOn} → ${announcement.endsOn}`
                  : announcement.startsOn
                    ? `From ${announcement.startsOn}`
                    : `Until ${announcement.endsOn}`}
              </p>
            )}
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-7">
            <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed">
              {message}
            </p>
            {isScheduled ? (
              <p className="mt-3 text-sm font-medium text-brand-700 dark:text-brand-300">
                More details and photos will appear here closer to the date.
              </p>
            ) : null}

            <div className="mt-7 flex flex-col sm:flex-row gap-2.5">
              {ctaHref.startsWith("http") ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1"
                >
                  <Button className="w-full group">
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </a>
              ) : (
                <Link href={ctaHref} className="inline-flex flex-1">
                  <Button className="w-full group">
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              )}
              <Link href="/events" className="inline-flex flex-1">
                <Button variant="outline" className="w-full">
                  All events
                </Button>
              </Link>
            </div>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-600 transition"
            >
              <Home className="w-3.5 h-3.5" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
