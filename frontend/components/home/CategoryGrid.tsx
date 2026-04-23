import Image from "next/image";

type CategoryItem = {
  id: number;
  title: string;
  image: string;
};

type CategoryGridProps = {
  items: CategoryItem[];
};

export default function CategoryGrid({ items }: CategoryGridProps) {
  return (
    <section className="px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: "var(--accent)" }}
            >
              Browse
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Browse by Category
            </h2>

            <p
              className="mt-3 text-sm leading-7 md:text-base"
              style={{ color: "var(--muted)" }}
            >
              Jump into genres and discover trailers by mood, style, story, and
              cinematic atmosphere.
            </p>
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
            Explore genres
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 overflow-hidden rounded-[30px] transition-all duration-500 hover:-translate-y-1"
              style={{
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 24vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent" />

              <div
                className="absolute -left-10 top-0 h-28 w-28 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-60"
                style={{ backgroundColor: "var(--accent)" }}
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="translate-y-2 transition duration-500 group-hover:translate-y-0">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">
                    Genre
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-55 text-sm text-white/70 opacity-0 transition duration-500 group-hover:opacity-100">
                    Explore trailers curated around {item.title.toLowerCase()}{" "}
                    stories.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
