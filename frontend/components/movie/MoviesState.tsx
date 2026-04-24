export function MoviesLoadingState() {
  return (
    <div className="mt-10 flex gap-4 overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[320px] max-w-[320px] rounded-2xl border p-4"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <div className="skeleton-shimmer h-52 rounded-xl" />
          <div className="skeleton-shimmer mt-4 h-4 w-2/3 rounded" />
          <div className="skeleton-shimmer mt-2 h-4 w-full rounded" />
          <div className="skeleton-shimmer mt-4 h-9 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function MoviesErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      className="mt-10 rounded-2xl border p-6"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <p className="text-sm text-red-400">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full px-4 py-2 text-sm font-semibold text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        Retry loading
      </button>
    </div>
  );
}

export function MoviesEmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div
      className="mt-10 rounded-2xl border p-6"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <p className="font-medium">No movies found.</p>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        {hasFilters
          ? "Try adjusting filters or search term."
          : "Movies are currently unavailable."}
      </p>
    </div>
  );
}
