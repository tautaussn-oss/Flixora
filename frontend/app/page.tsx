export default function HomePage() {
  const benefits = [
    {
      title: "Fast discovery",
      text: "Quickly explore trending and latest trailers without distractions.",
      icon: "⚡",
    },
    {
      title: "Trailer-first",
      text: "Focused experience built for people who want to preview movies fast.",
      icon: "🎬",
    },
    {
      title: "Clean interface",
      text: "Modern design with full dark and light mode support.",
      icon: "🌙",
    },
  ];

  return (
    <div
      className="transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <section
        className="px-6 pb-20 pt-28 md:px-10 lg:px-16"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span
              className="inline-flex rounded-full px-4 py-1 text-sm font-medium"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--accent)",
                border: "1px solid var(--border)",
              }}
            >
              Trailer discovery platform
            </span>

            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
              Discover movies through{" "}
              <span style={{ color: "var(--accent)" }}>trailers</span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-lg leading-8"
              style={{ color: "var(--muted)" }}
            >
              Flixora helps users discover trending trailers, explore upcoming
              movies and quickly decide what to watch next.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Explore trailers
              </button>

              <button
                className="rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105"
                style={{
                  backgroundColor: "var(--surface-strong)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                Watch featured
              </button>
            </div>
          </div>

          <div>
            <div
              className="rounded-4xl p-4 shadow-xl"
              style={{
                backgroundColor: "var(--surface-strong)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="rounded-3xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, rgba(37,99,235,0.12) 100%)",
                }}
              >
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  Featured trailer
                </span>

                <h2 className="mt-5 text-3xl font-bold text-white">
                  Interstellar
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/85">
                  A cinematic sci-fi trailer experience with a clean layout that
                  keeps the focus on discovery.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:scale-105">
                    ▶ Watch trailer
                  </button>

                  <button className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20">
                    More info
                  </button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs text-white/70">Genre</p>
                    <p className="mt-1 font-semibold text-white">
                      Sci-Fi / Adventure
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs text-white/70">Trailer length</p>
                    <p className="mt-1 font-semibold text-white">2m 49s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">Why Flixora?</h2>

          <p
            className="mx-auto mt-4 max-w-3xl text-center text-lg"
            style={{ color: "var(--muted)" }}
          >
            Built for movie lovers who want fast, simple and beautiful access to
            trailers.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl p-8 text-center"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div
          className="mx-auto max-w-5xl rounded-4xl p-10 text-center text-white md:p-14"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Start exploring trailers now
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Discover your next movie in seconds with a clean trailer-first
            experience.
          </p>

          <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:scale-105">
            Explore movies
          </button>
        </div>
      </section>
    </div>
  );
}
