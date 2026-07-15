import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "default" | "kids" | "light";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  variant = "default",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-14 md:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "eyebrow mb-4 sm:mb-5",
            align === "center" && "eyebrow-center",
            variant === "kids" &&
              "text-kids-600 dark:text-kids-400 [&::before]:bg-kids-500/50 [&::after]:bg-kids-500/50",
            variant === "light" &&
              "text-white/90 [&::before]:bg-white/40 [&::after]:bg-white/40"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-[1.6rem] leading-[1.15] sm:text-[2rem] sm:leading-[1.1] md:text-[2.75rem] lg:text-5xl font-bold tracking-tight text-balance",
          variant === "light" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 sm:mt-5 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed text-balance",
            align === "center" && "mx-auto",
            variant === "light" ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
