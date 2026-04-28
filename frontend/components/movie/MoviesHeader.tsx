type MoviesHeaderProps = {
  totalMovies: number;
  totalActors: number;
};

export default function MoviesHeader({
  totalMovies,
  totalActors,
}: MoviesHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border px-6 py-8 md:px-8 md:py-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 30%), linear-gradient(135deg, color-mix(in srgb, var(--surface-strong) 80%, transparent) 0%, color-mix(in srgb, var(--bg-soft) 92%, transparent) 55%, color-mix(in srgb, var(--surface) 96%, transparent) 100%)",
        }}
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: "var(--accent)" }}
          >
            Movie / Series
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Movies
          </h1>
          <p
            className="mt-4 max-w-2xl text-sm leading-7 md:text-base"
            style={{ color: "var(--muted)" }}
          ></p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-fit">
          <StatCard value={String(totalMovies)} label="Movies loaded" />
          <StatCard value={String(totalActors)} label="Cast highlights" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="min-w-37 rounded-3xl border px-4 py-4"
      style={{
        borderColor: "var(--border)",
        backgroundColor:
          "color-mix(in srgb, var(--surface-strong) 78%, transparent)",
      }}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </p>
    </div>
  );
}
