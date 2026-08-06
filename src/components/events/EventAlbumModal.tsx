"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close photo"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex w-full max-w-[420px] flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between gap-2 text-white/90 px-0.5">
          <p className="text-xs sm:text-sm font-medium truncate">
            {title}
            <span className="text-white/45 font-normal">
              {" "}
              · {index + 1}/{photos.length}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact square frame — same size for every photo */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl ring-1 ring-white/10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`${title} — photo ${index + 1}`}
                fill
                sizes="420px"
                quality={90}
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() =>
                  onIndex((index - 1 + photos.length) % photos.length)
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-full bg-black/45 hover:bg-black/60 text-white backdrop-blur-sm transition"
                aria-label="Previous photo"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onIndex((index + 1) % photos.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-full bg-black/45 hover:bg-black/60 text-white backdrop-blur-sm transition"
                aria-label="Next photo"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : null}
        </div>

        {photos.length > 1 ? (
          <div className="flex w-full gap-1.5 overflow-x-auto pb-0.5 scrollbar-none justify-center">
            {photos.map((thumb, i) => (
              <button
                key={`${thumb}-${i}`}
                type="button"
                onClick={() => onIndex(i)}
                className={cn(
                  "relative h-11 w-11 shrink-0 rounded-lg overflow-hidden ring-2 transition",
                  i === index
                    ? "ring-white"
                    : "ring-transparent opacity-55 hover:opacity-90"
                )}
                aria-label={`Photo ${i + 1}`}
              >
                <Image
                  src={thumb}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-album-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          aria-label="Close gallery"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full sm:max-w-3xl max-h-[88vh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden"
        >
          <div className="shrink-0 flex items-start justify-between gap-3 px-4 sm:px-5 pt-4 pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5",
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
                className="font-display text-lg sm:text-xl font-bold text-foreground leading-snug truncate"
              >
                {event.title}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                {event.date ? (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                ) : null}
                {photos.length > 0 ? (
                  <span>{photos.length} photos</span>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {photos.length === 0 ? (
              <p className="text-center text-muted-foreground py-10 text-sm">
                No photos in this album yet.
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {photos.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
                  >
                    <Image
                      src={src}
                      alt={`${event.title} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 160px"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <PhotoLightbox
            key="photo-lightbox"
            photos={photos}
            index={lightboxIndex}
            title={event.title}
            onClose={() => setLightboxIndex(null)}
            onIndex={setLightboxIndex}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
