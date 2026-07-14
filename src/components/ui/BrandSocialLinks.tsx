import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
} as const;

type SocialKey = keyof typeof icons;

export function BrandSocialLinks({
  social,
  accent = "brand",
  size = "md",
  className,
}: {
  social: Partial<Record<SocialKey, string>>;
  accent?: "brand" | "kids";
  size?: "sm" | "md";
  className?: string;
}) {
  const dim = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const iconDim = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {(Object.keys(icons) as SocialKey[]).map((key) => {
        const url = social[key];
        if (!url) return null;
        const Icon = icons[key];
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              key === "instagram"
                ? "Instagram"
                : key === "facebook"
                  ? "Facebook"
                  : "YouTube"
            }
            className={cn(
              "rounded-lg flex items-center justify-center transition-colors",
              dim,
              accent === "brand"
                ? "bg-gray-800 text-gray-200 hover:bg-brand-600 hover:text-white"
                : "bg-gray-800 text-gray-200 hover:bg-kids-500 hover:text-white"
            )}
          >
            <Icon className={iconDim} />
          </a>
        );
      })}
    </div>
  );
}
