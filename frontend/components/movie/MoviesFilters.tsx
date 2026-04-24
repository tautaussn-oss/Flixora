import type { ApiActor, ApiGenre } from "@/src/lib/api";

type MoviesFiltersProps = {
  search: string;
  genre: string;
  actor: string;
  genres: ApiGenre[];
  actors: ApiActor[];
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onActorChange: (value: string) => void;
  onReset: () => void;
};

export default function MoviesFilters({
  search,
  genre,
  actor,
  genres,
  actors,
  onSearchChange,
  onGenreChange,
  onActorChange,
  onReset,
}: MoviesFiltersProps) {
  return (
    <section
      className="mt-6 rounded-3xl border p-5 md:p-6"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold md:text-xl">Filters</h2>

        <button
          type="button"
          onClick={onReset}
          className="rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-strong)" }}
        >
          Reset
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or description"
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-strong)" }}
        />

        <select
          value={genre}
          onChange={(event) => onGenreChange(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-strong)" }}
        >
          <option value="all">All genres</option>
          {genres.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={actor}
          onChange={(event) => onActorChange(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-strong)" }}
        >
          <option value="all">All actors</option>
          {actors.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
