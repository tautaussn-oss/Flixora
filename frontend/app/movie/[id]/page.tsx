import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, Film, Tags, UserRound } from "lucide-react";
import { getMovieById, resolveMediaImage, resolveTrailerUrl } from "@/src/lib/api";

type MovieDetailPageProps = {
  params: { id: string };
};

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = params;

  let movie;

  try {
    movie = await getMovieById(id);
  } catch {
    notFound();
  }

  const poster = resolveMediaImage(movie.poster ?? "");
  const trailer = resolveTrailerUrl(movie.trailer ?? "");

  return (
    <div className="relative overflow-hidden px-6 pb-20 pt-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link
          href="/movie"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <ArrowLeft size={15} />
          Back to Movies
        </Link>

        <section
          className="relative overflow-hidden rounded-[2rem] border"
          style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-medium)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.02)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/58 to-black/26" />

          <div className="relative max-w-3xl p-8 text-white md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Movie Details
            </p>

            <h1 className="mt-4 text-4xl font-bold md:text-5xl">{movie.title}</h1>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} /> {movie.year ?? "N/A"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={14} /> {movie.duration ? `${movie.duration} min` : "N/A"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tags size={14} />
                {movie.genres?.map((genre) => genre.name).join(", ") || "General"}
              </span>
            </div>

            <p className="mt-5 text-base leading-8 text-white/80">
              {movie.description || "No description provided for this movie yet."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {trailer ? (
                <a
                  href={trailer}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  <Film size={15} /> Watch Trailer
                </a>
              ) : null}

              {movie.kids ? (
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium">
                  Kids friendly
                </span>
              ) : null}

              {movie.featured ? (
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium">
                  Featured movie
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <section
          className="rounded-3xl border p-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <h2 className="text-xl font-semibold">Cast</h2>

          {movie.actors?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.actors.map((actor) => (
                <span
                  key={actor.id}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-strong)" }}
                >
                  <UserRound size={14} /> {actor.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              Cast is not available for this movie yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
