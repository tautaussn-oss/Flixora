export default function NewsletterCTA() {
  return (
    <section className="px-6 pb-24 pt-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[40px] p-8 md:p-10 lg:p-14"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 72%, #0f172a) 100%)",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          <div className="absolute inset-0 opacity-70">
            <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75 md:text-sm">
                Stay updated
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Get fresh trailer drops and upcoming releases in your inbox
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                Subscribe and stay in sync with the newest movie trailers, top
                series previews, featured weekly picks, and upcoming cinematic
                releases.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {["Weekly picks", "Upcoming releases", "Top trailers"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur md:text-sm"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div
              className="rounded-[30px] p-4 md:p-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.12)",
                backdropFilter: "blur(18px)",
              }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-3 text-sm font-medium text-white/80">
                    Join the Flixora newsletter
                  </p>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-2xl bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/65"
                    style={{
                      border: "1px solid rgba(255,255,255,0.18)",
                    }}
                  />
                </div>

                <button
                  className="rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold transition duration-300 hover:scale-[1.01]"
                  style={{
                    color: "var(--accent)",
                  }}
                >
                  Join newsletter
                </button>

                <p className="text-xs leading-6 text-white/65">
                  No spam. Just featured trailers, major releases, and curated
                  picks worth watching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
