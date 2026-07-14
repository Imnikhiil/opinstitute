export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden>
      <div className="space-y-2">
        <div className="h-3 w-16 rounded bg-brand-100 dark:bg-brand-900/40" />
        <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-200/80 dark:bg-gray-800/80" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/10"
          />
        ))}
      </div>
    </div>
  );
}
