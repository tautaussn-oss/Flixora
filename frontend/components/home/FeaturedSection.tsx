import MovieCard from "./MovieCard";

type Item = {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: string;
  image: string;
};

type FeaturedSectionProps = {
  items: Item[];
};

export default function FeaturedSection({ items }: FeaturedSectionProps) {
  return (
    <section className="px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: "var(--accent)" }}
            >
              Featured Collection
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Featured This Week
            </h2>

            <p
              className="mt-3 max-w-xl text-sm leading-7 md:text-base"
              style={{ color: "var(--muted)" }}
            >
              A curated lineup of standout trailers, editor picks, and
              must-watch releases.
            </p>
          </div>

          <button
            className="rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            Explore all
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
