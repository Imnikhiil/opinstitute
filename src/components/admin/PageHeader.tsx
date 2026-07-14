export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 mb-1.5">
            Admin
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
      </div>
      <div className="mt-5 h-px bg-gradient-to-r from-brand-200/80 via-gray-200 to-transparent dark:from-brand-800/50 dark:via-gray-800" />
    </div>
  );
}
