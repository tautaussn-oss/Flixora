type MoviesFiltersProps = {
  search: string;
  genre: string;
  actor: string;
  year: string;
  genres: string[];
  actors: { name: string }[];
  years: number[];
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onActorChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onReset: () => void;
};

export default function MoviesFilters({
  search,
  genre,
  actor,
  year,
  genres,
  actors,
  years,
  onSearchChange,
  onGenreChange,
  onActorChange,
  onYearChange,
  onReset,
}: MoviesFiltersProps) {
  return (
    <section
      className="mt-6 rounded-4xl border px-5 py-5 md:px-7 md:py-6"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--surface-strong) 84%, transparent) 0%, color-mix(in srgb, var(--surface) 98%, transparent) 100%)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: "var(--accent)" }}
          >
            Advance Search
          </p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            Filter the catalog
          </h2>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          Reset filters
        </button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or mood"
          className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:-translate-y-px"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-strong)",
          }}
        />

        <select
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
          className="w-full rounded-2xl border px-4 py-3 text-sm outline-none"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-strong)",
          }}
        >
          <option value="all">All years</option>
          {years.map((item) => (
            <option key={item} value={String(item)}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={genre}
          onChange={(event) => onGenreChange(event.target.value)}
          className="w-full rounded-2xl border px-4 py-3 text-sm outline-none"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-strong)",
          }}
        >
          <option value="all">All genres</option>
          {genres.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={actor}
          onChange={(event) => onActorChange(event.target.value)}
          className="w-full rounded-2xl border px-4 py-3 text-sm outline-none"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-strong)",
          }}
        >
          <option value="all">All actors</option>
          {actors.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <GenreChip
          active={genre === "all"}
          onClick={() => onGenreChange("all")}
          label="All"
        />
        {genres.slice(0, 8).map((item) => (
          <GenreChip
            key={item}
            active={genre === item}
            onClick={() => onGenreChange(item)}
            label={item}
          />
        ))}
      </div>
    </section>
  );
}

function GenreChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition hover:-translate-y-0.5"
      style={{
        borderColor: active ? "transparent" : "var(--border)",
        backgroundColor: active ? "var(--accent)" : "var(--surface)",
        color: active ? "#ffffff" : "var(--muted)",
        boxShadow: active ? "var(--shadow-accent)" : "none",
      }}
    >
      {label}
    </button>
  );
}
