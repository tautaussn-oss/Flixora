export default function MoviesHeader() {
  return (
    <section
      className="rounded-[2rem] border p-6 md:p-8"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, var(--surface-strong)) 0%, var(--surface-strong) 68%)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <p
        className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ borderColor: "var(--border)", color: "var(--accent)" }}
      >
        Flixora Library
      </p>

      <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
        Movies with smart filters and trailer-first browsing.
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
        Keep the same visual language as home page while giving users faster
        control over search and discovery.
      </p>
    </section>
  );
}
