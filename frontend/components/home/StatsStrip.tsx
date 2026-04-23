const stats = [
  { label: "Trailers", value: "2,500+" },
  { label: "Movies", value: "850+" },
  { label: "Series", value: "320+" },
  { label: "Updated weekly", value: "Every Friday" },
];

export default function StatsStrip() {
  return (
    <section className="px-6 pb-4 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl p-5"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
