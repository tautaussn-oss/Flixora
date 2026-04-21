type MovieCardProps = {
  title: string;
  year: string;
  genre: string;
  rating: string;
  image: string;
};

export default function MovieCard({
  title,
  year,
  genre,
  rating,
  image,
}: MovieCardProps) {
  return (
    <div
      className="group relative min-w-60 overflow-hidden rounded-[30px] transition-all duration-500 hover:-translate-y-2"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="relative h-90 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            IMDb {rating}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            HD
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="translate-y-3 transition duration-500 group-hover:translate-y-0">
            <div className="mb-3 flex flex-wrap gap-2 opacity-80">
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                {year}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                {genre}
              </span>
            </div>

            <h3 className="line-clamp-2 text-xl font-bold text-white">
              {title}
            </h3>

            <div className="mt-4 flex items-center gap-3 opacity-0 transition duration-500 group-hover:opacity-100">
              <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]">
                ▶ Watch
              </button>

              <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                + List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
