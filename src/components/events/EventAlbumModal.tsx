"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, X } from "lucide-react";
import type { Event } from "@/data/events";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  academic: "Academic",
  cultural: "Cultural",
  sports: "Sports",
  preschool: "Kids Activity",
};

export function albumPhotos(event: Event): string[] {
  if (event.photos?.length) return event.photos;
  return event.image ? [event.image] : [];
}

function PhotoLightbox({
  photos,
  index,
  title,
  onClose,
  onIndex,
}: {
  photos: string[];
  index: number;
  title: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (e.key === "ArrowLeft")
        onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onClose, onIndex]);

  const src = photos[index];
  if (!src) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-3 sm:p-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close photo"
        onClick={onClose}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between gap-3 text-white/90">
          <p className="text-sm font-medium truncate">
            {title}
            <span className="text-white/50 font-normal">
              {" "}
              · {index + 1} / {photos.length}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full h-[70vh] sm:h-[78vh]">
          <Image
            src={src}
            alt={`${title} — photo ${index + 1}`}
            fill
            sizes="100vw"
            quality={95}
            className="object-contain"
            priority
          />
        </div>

        {photos.length > 1 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndex((index - 1 + photos.length) % photos.length);
              }}
              className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition"
              aria-label="Previous photo"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndex((index + 1) % photos.length);
              }}
              className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition"
              aria-label="Next photo"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EventAlbumModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  const photos = albumPhotos(event);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxIndex === null) onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, lightboxIndex]);

  return (
    <>
      <div
        className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-album-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          aria-label="Close gallery"
          onClick={onClose}
        />
        <div className="relative z-10 w-full sm:max-w-5xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-white/20 dark:border-white/10">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 pb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-100 dark:border-white/10">
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.16em] mb-1",
                  event.brand === "preschool"
                    ? "text-kids-600 dark:text-kids-400"
                    : "text-brand-600 dark:text-brand-400"
                )}
              >
                {event.brand === "preschool"
                  ? "OP Kids Pre School"
                  : "OP Institute of Studies"}
                {" · "}
                {typeLabels[event.type] ?? event.type}
              </p>
              <h2
                id="event-album-title"
                className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight"
              >
                {event.title}
              </h2>
              {event.date ? (
                <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </p>
              ) : null}
              {event.description ? (
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {event.description}
                </p>
              ) : null}
              {photos.length > 0 ? (
                <p className="mt-2 text-xs font-semibold text-muted-foreground">
                  {photos.length} photos · tap any photo to enlarge
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {photos.length === 0 ? (
              <p className="text-center text-muted-foreground py-10 text-sm">
                No photos in this album yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
                {photos.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
                  >
                    <Image
                      src={src}
                      alt={`${event.title} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          title={event.title}
          onClose={() => setLightboxIndex(null)}
          onIndex={setLightboxIndex}
        />
      ) : null}
    </>
  );
}
