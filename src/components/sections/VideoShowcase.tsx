"use client";

import { getVideoEmbed, type SiteVideo } from "@/data/videos";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function VideoShowcase({
  videos,
  badge,
  title,
  subtitle,
  variant = "default",
  className,
}: {
  videos: SiteVideo[];
  badge: string;
  title: string;
  subtitle?: string;
  variant?: "default" | "kids" | "light";
  className?: string;
}) {
  const list = videos.filter((v) => v.active && v.videoUrl);
  if (list.length === 0) return null;

  return (
    <section className={cn("section-padding", className)}>
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeader
            badge={badge}
            title={title}
            subtitle={subtitle}
            variant={variant}
          />
        </ScrollReveal>

        <div
          className={cn(
            "grid gap-6 sm:gap-8",
            list.length === 1
              ? "max-w-3xl mx-auto"
              : "md:grid-cols-2 lg:grid-cols-2"
          )}
        >
          {list.map((video, i) => {
            const embed = getVideoEmbed(video.videoUrl);
            if (!embed) return null;
            return (
              <ScrollReveal key={video.id} delay={i * 0.08}>
                <article className="rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900 shadow-card">
                  <div className="relative aspect-video bg-black">
                    {embed.type === "file" ? (
                      <video
                        src={embed.src}
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.thumbnailUrl || undefined}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    ) : (
                      <iframe
                        src={embed.src}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display font-semibold text-base sm:text-lg text-foreground">
                      {video.title}
                    </h3>
                    {video.description ? (
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {video.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
