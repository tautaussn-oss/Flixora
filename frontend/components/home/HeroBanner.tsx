import Image from "next/image";

type HeroBannerProps = {
  item: {
    id: number;
    title: string;
    description: string;
    year: string;
    genre: string;
    rating: string;
    duration: string;
    image: string;
    trailer: string;
    kind: "movie" | "show";
  };
};

export default function HeroBanner({ item }: HeroBannerProps) {
  return (
    <section className="relative w-full pt-28">
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 opacity-70">
          <div
            className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 md:px-10 lg:px-16">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                Featured this week
              </span>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  item.genre,
                  item.kind === "show" ? "Series" : "Movie",
                  `IMDb ${item.rating}`,
                  item.duration,
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="mt-8 text-5xl font-extrabold leading-[0.95] text-white md:text-6xl lg:text-7xl xl:text-[90px]">
                Discover movies
                <br />
                through{" "}
                <span style={{ color: "#8eb7ff" }}>cinematic trailers</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-white/80">
                {item.description}
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href={item.trailer || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03]"
                  style={{
                    backgroundColor: "var(--accent)",
                    boxShadow: "var(--shadow-accent)",
                  }}
                >
                  ▶ Watch Trailer
                </a>

                <button className="rounded-full bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                  More Info
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Updated", value: "Daily drops" },
                  { label: "Library", value: "Movies & series" },
                  { label: "Quality", value: "HD previews" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/10 px-4 py-4 text-white backdrop-blur"
                  >
                    <p className="text-xs uppercase text-white/60">
                      {item.label}
                    </p>
                    <p className="mt-1 font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="relative overflow-hidden rounded-4xl bg-white/10 p-4 backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[28px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={640}
                    height={768}
                    className="h-120 w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-0 p-6 text-white">
                    <h2 className="text-3xl font-bold">{item.title}</h2>

                    <p className="mt-2 text-sm text-white/80">
                      {item.description}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <a
                        href={item.trailer || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/20 px-4 py-2 text-sm"
                      >
                        ▶ Play
                      </a>

                      <button className="rounded-full border border-white/20 px-4 py-2 text-sm">
                        + Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Type",
                    value: item.kind === "show" ? "Series" : "Movie",
                  },
                  { label: "Genre", value: item.genre },
                  { label: "Preview", value: item.duration },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white/10 px-4 py-3 text-white backdrop-blur"
                  >
                    <p className="text-xs text-white/60">{item.label}</p>
                    <p className="mt-1 font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
