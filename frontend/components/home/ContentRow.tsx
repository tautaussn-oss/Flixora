import MovieCard from "./MovieCard";

type Item = {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: string;
  image: string;
};

type ContentRowProps = {
  title: string;
  subtitle?: string;
  items: Item[];
};

export default function ContentRow({
  title,
  subtitle,
  items,
}: ContentRowProps) {
  return (
    <section className="relative px-6 py-14 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              {title}
            </h2>

            {subtitle ? (
              <p
                className="mt-2 text-sm leading-7 md:text-base"
                style={{ color: "var(--muted)" }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>

          <button
            className="inline-flex w-fit rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--surface) 88%, transparent)",
              color: "var(--text)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            View all
          </button>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-24 md:block"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0), var(--bg))",
            }}
          />

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item) => (
              <div key={item.id} className="snap-start">
                <MovieCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
