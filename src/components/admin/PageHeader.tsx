export function PageHeader({
  title,
  subtitle,
  actions,
  eyebrow = "Admin",
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 mb-1.5">
            {eyebrow}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1d2951] dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1.5 text-sm sm:text-[15px] max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
      <div className="mt-5 h-px bg-gradient-to-r from-brand-200/80 via-gray-200 to-transparent dark:from-brand-800/50 dark:via-gray-800" />
    </div>
  );
}
