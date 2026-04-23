const upcoming = [
  {
    title: "Dune: Part Three",
    date: "December 2026",
    text: "The next chapter expands the desert saga with a more epic scale.",
  },
  {
    title: "The Batman II",
    date: "October 2026",
    text: "A darker Gotham returns with new enemies and deeper mystery.",
  },
  {
    title: "Avengers: Secret Wars",
    date: "May 2027",
    text: "A massive crossover event with universe-shaking consequences.",
  },
];

export default function UpcomingSection() {
  return (
    <section className="px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: "var(--accent)" }}
            >
              Coming Soon
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Upcoming Trailers
            </h2>

            <p
              className="mt-3 text-sm leading-7 md:text-base"
              style={{ color: "var(--muted)" }}
            >
              Keep an eye on the most anticipated releases and trailer drops
              coming next.
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
            View calendar
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {upcoming.map((item, index) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-[30px] p-6 transition-all duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--surface) 88%, transparent) 0%, color-mix(in srgb, var(--card) 92%, transparent) 100%)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl opacity-50"
                style={{ backgroundColor: "var(--accent)" }}
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--surface-strong) 90%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {item.date}
                  </span>

                  <span
                    className="text-xs font-medium uppercase tracking-[0.16em]"
                    style={{ color: "var(--muted)" }}
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold leading-tight">
                  {item.title}
                </h3>

                <p
                  className="mt-3 text-sm leading-7 md:text-base"
                  style={{ color: "var(--muted)" }}
                >
                  {item.text}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03]"
                    style={{
                      backgroundColor: "var(--accent)",
                      boxShadow: "var(--shadow-accent)",
                    }}
                  >
                    Notify me
                  </button>

                  <button
                    className="rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 hover:scale-[1.03]"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--surface-strong) 90%, transparent)",
                      color: "var(--text)",
                    }}
                  >
                    More info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
