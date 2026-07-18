import type { Metadata } from "next";
import { Suspense } from "react";
import { getEvents } from "@/lib/supabase/public-data";
import { parseBrandFilter } from "@/data/brands";
import { EventsPageClient } from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events at OP Institute of Studies — academic programs, cultural celebrations, sports day, and OP Kids Pre School activities.",
};

export const revalidate = 60;

type EventsPageProps = {
  searchParams?: Promise<{ brand?: string }> | { brand?: string };
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const events = await getEvents();
  const params = await Promise.resolve(searchParams ?? {});
  const initialBrand = parseBrandFilter(params.brand);

  return (
    <Suspense
      fallback={
        <div className="section-padding container-custom text-center text-muted-foreground">
          Loading events…
        </div>
      }
    >
      <EventsPageClient events={events} initialBrand={initialBrand} />
    </Suspense>
  );
}
