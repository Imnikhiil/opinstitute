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
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4",
            variant === "kids"
              ? "bg-kids-100 text-kids-700 dark:bg-kids-900/30 dark:text-kids-300"
              : variant === "light"
                ? "bg-white/20 text-white"
                : "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance",
          variant === "light" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl text-balance",
            align === "center" && "mx-auto",
            variant === "light"
              ? "text-white/80"
              : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
