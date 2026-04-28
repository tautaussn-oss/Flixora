"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, Play, Plus, Star } from "lucide-react";
import TrailerModal from "./TrailerModal";
import {
  getMovieCatalog,
  type CatalogMovie,
  type MovieCatalog,
} from "@/src/lib/movie-catalog";

type CatalogState = {
  loading: boolean;
  error: string | null;
  data: MovieCatalog | null;
};

const initialState: CatalogState = {
  loading: true,
  error: null,
  data: null,
};

export default function HomePageClient() {
  const [catalog, setCatalog] = useState<CatalogState>(initialState);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeGenre, setActiveGenre] = useState("all");
  const [trailerModal, setTrailerModal] = useState({
    open: false,
    url: "",
    title: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getMovieCatalog();

        if (cancelled) return;

        setCatalog({ loading: false, error: null, data });
      } catch (error) {
        console.error("Homepage movie catalog failed", error);
        if (!cancelled) {
          setCatalog({
            loading: false,
            error: "Could not load the new homepage demo right now.",
            data: null,
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const heroMovies = catalog.data?.heroMovies ?? [];
  const leadMovie = heroMovies[heroIndex] ?? heroMovies[0] ?? null;
  const genreOptions = useMemo(
    () => ["all", ...(catalog.data?.genres.slice(0, 7) ?? [])],
    [catalog.data?.genres],
  );

  const movieStrip = useMemo(() => {
    const source = catalog.data?.spotlightMovies ?? [];

    if (activeGenre === "all") {
      return source.slice(0, 6);
    }

    return source
      .filter((movie) => movie.genres.includes(activeGenre))
      .slice(0, 6);
  }, [activeGenre, catalog.data?.spotlightMovies]);

  useEffect(() => {
    if (heroMovies.length <= 1 || trailerModal.open) return;

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroMovies.length);
    }, 7000);

    return () => {
      window.clearInterval(timer);
    };
  }, [heroMovies.length, trailerModal.open]);

  const openTrailer = (movie: CatalogMovie) => {
    if (!movie.trailer) return;

    setTrailerModal({ open: true, url: movie.trailer, title: movie.title });
  };

  return (
    <>
      <div className="relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 22%), linear-gradient(180deg, color-mix(in srgb, var(--bg-soft) 65%, transparent) 0%, transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl space-y-8">
          <HomeHero
            movie={leadMovie}
            heroMovies={heroMovies}
            activeIndex={heroIndex}
            onSelect={setHeroIndex}
            onWatch={openTrailer}
          />

          {catalog.loading ? <HomeSkeleton /> : null}
          {!catalog.loading && catalog.error ? (
            <Panel>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {catalog.error}
              </p>
            </Panel>
          ) : null}

          {!catalog.loading && catalog.data ? (
            <>
              <PosterRow
                title="Trends"
                subtitle="Fast-entry picks surfaced from the main movie feed."
                movies={catalog.data.trendingMovies}
                onWatch={openTrailer}
              />

              <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.72fr)]">
                <Panel>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Movies</h2>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        Seach section
                      </p>
                    </div>

                    <Link
                      href="/movie"
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      See more
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {genreOptions.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => setActiveGenre(genre)}
                        className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition hover:-translate-y-0.5"
                        style={{
                          borderColor:
                            activeGenre === genre
                              ? "transparent"
                              : "var(--border)",
                          backgroundColor:
                            activeGenre === genre
                              ? "var(--accent)"
                              : "var(--surface)",
                          color:
                            activeGenre === genre ? "#ffffff" : "var(--muted)",
                          boxShadow:
                            activeGenre === genre
                              ? "var(--shadow-accent)"
                              : "none",
                        }}
                      >
                        {genre === "all" ? "All" : genre}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {movieStrip.map((movie) => (
                      <PosterCard
                        key={movie.id}
                        movie={movie}
                        onWatch={openTrailer}
                        compact
                      />
                    ))}
                  </div>
                </Panel>

                <AwardPanel movies={catalog.data.awardMovies} />
              </section>

              <section className="grid gap-4 lg:grid-cols-3">
                {catalog.data.actorGroups.map((group) => (
                  <Panel key={group.title}>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.22em]"
                      style={{ color: "var(--accent)" }}
                    >
                      Cast Division
                    </p>
                    <h3 className="mt-3 text-xl font-semibold">
                      {group.title}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: "var(--muted)" }}
                    >
                      {group.description}
                    </p>

                    <div className="mt-5 space-y-3">
                      {group.actors.map((actor) => (
                        <div
                          key={actor.name}
                          className="flex items-center gap-3 rounded-[1.25rem] border p-3"
                          style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--surface)",
                          }}
                        >
                          <div className="flex -space-x-3">
                            {actor.posters.slice(0, 2).map((poster, index) => (
                              <div
                                key={`${actor.name}-${index}`}
                                className="h-12 w-12 rounded-full border bg-cover bg-center"
                                style={{
                                  borderColor: "var(--surface-strong)",
                                  backgroundImage: `url(${poster})`,
                                }}
                              />
                            ))}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {actor.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "var(--muted)" }}
                            >
                              {actor.appearances} appearances · latest{" "}
                              {actor.latestYear || "N/A"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                ))}
              </section>
            </>
          ) : null}
        </div>
      </div>

      <TrailerModal
        open={trailerModal.open}
        trailerUrl={trailerModal.url}
        title={trailerModal.title}
        onClose={() => setTrailerModal({ open: false, url: "", title: "" })}
      />
    </>
  );
}

function HomeHero({
  movie,
  heroMovies,
  activeIndex,
  onSelect,
  onWatch,
}: {
  movie: CatalogMovie | null;
  heroMovies: CatalogMovie[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onWatch: (movie: CatalogMovie) => void;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-[2.5rem] border"
      style={{
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-medium)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie?.poster ?? "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop"})`,
          transform: "scale(1.02)",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/86 via-black/58 to-black/18" />
      <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-black/40" />

      <div className="relative grid min-h-140 gap-8 px-6 py-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-12 lg:py-12">
        <div className="max-w-2xl self-end text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Home page demo
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-none md:text-6xl">
            {movie?.title ?? "Featured title"}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/82">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="text-yellow-300" />
              {movie
                ? Math.max(
                    7.2,
                    Math.min(9.7, 7.5 + movie.spotlightScore / 50),
                  ).toFixed(1)
                : "8.6"}
            </span>
            <span>{movie?.year || "TBA"}</span>
            <span>{movie?.genres[0] ?? "Drama"}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} />
              {movie?.duration ? `${movie.duration} min` : "Preview"}
            </span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/76 md:text-base">
            {movie?.description ??
              "A cleaner homepage direction focused on visual discovery, trailer-first actions and fewer backend requests."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => movie && onWatch(movie)}
              disabled={!movie?.trailer}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
              style={{
                backgroundColor: "var(--accent)",
                boxShadow: "var(--shadow-accent)",
              }}
            >
              <Play size={16} />
              Watch trailer
            </button>

            <Link
              href="/movie"
              className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/16"
            >
              <Plus size={16} />
              Browse movies
            </Link>
          </div>
        </div>

        <div className="self-end rounded-4xl border border-white/12 bg-black/18 p-3 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-3">
            {heroMovies.slice(0, 4).map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(index)}
                className="relative overflow-hidden rounded-[1.25rem] border text-left transition hover:-translate-y-0.5"
                style={{
                  borderColor:
                    index === activeIndex
                      ? "rgba(255,255,255,0.42)"
                      : "rgba(255,255,255,0.14)",
                }}
              >
                <div
                  className="aspect-[1.15] bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.poster})` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="line-clamp-1 text-sm font-semibold">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PosterRow({
  title,
  subtitle,
  movies,
  onWatch,
}: {
  title: string;
  subtitle: string;
  movies: CatalogMovie[];
  onWatch: (movie: CatalogMovie) => void;
}) {
  return (
    <Panel>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <PosterCard key={movie.id} movie={movie} onWatch={onWatch} />
        ))}
      </div>
    </Panel>
  );
}

function PosterCard({
  movie,
  onWatch,
  compact = false,
}: {
  movie: CatalogMovie;
  onWatch: (movie: CatalogMovie) => void;
  compact?: boolean;
}) {
  return (
    <article className="group">
      <div
        className="relative overflow-hidden rounded-[1.4rem] border"
        style={{
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div
          className={`bg-cover bg-center transition duration-500 group-hover:scale-[1.03] ${compact ? "aspect-[0.88]" : "aspect-[0.72]"}`}
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/8 to-transparent" />
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-br-2xl rounded-tl-[1.4rem] bg-black/35 text-white backdrop-blur-md">
          <Plus size={18} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/72">
            {movie.genres[0] ?? "General"}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
            {movie.title}
          </h3>
        </div>
      </div>

      {!compact ? (
        <button
          type="button"
          onClick={() => onWatch(movie)}
          className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--accent)",
            boxShadow: "var(--shadow-accent)",
          }}
        >
          <Play size={15} />
          Watch trailer
        </button>
      ) : null}
    </article>
  );
}

function AwardPanel({ movies }: { movies: CatalogMovie[] }) {
  return (
    <section
      className="relative overflow-hidden rounded-4xl border p-6"
      style={{
        borderColor: "rgba(122, 92, 10, 0.2)",
        background:
          "linear-gradient(135deg, #f5c535 0%, #edb20a 45%, #f8db74 100%)",
        boxShadow: "0 22px 46px rgba(122, 92, 10, 0.18)",
      }}
    >
      <div className="absolute -right-16 -bottom-10.5 h-52 w-52 rounded-full bg-white/18 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/70">
          Golden Globe vibe
        </p>
        <h2 className="mt-3 max-w-[10ch] text-4xl font-black leading-none text-black md:text-5xl">
          GOLDEN GLOBE AWARDS
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-black/75"></p>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-23 overflow-hidden rounded-2xl border border-black/12 shadow-lg"
            >
              <div
                className="aspect-[0.75] bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.poster})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="rounded-4xl border p-5 md:p-6"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--surface-strong) 82%, transparent) 0%, color-mix(in srgb, var(--surface) 96%, transparent) 100%)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {children}
    </section>
  );
}

function HomeSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-4xl border p-5"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <div className="skeleton-shimmer aspect-[1.6] rounded-[1.4rem]" />
          <div className="skeleton-shimmer mt-4 h-5 w-1/2 rounded" />
          <div className="skeleton-shimmer mt-2 h-4 w-full rounded" />
          <div className="skeleton-shimmer mt-2 h-4 w-4/5 rounded" />
        </div>
      ))}
    </div>
  );
}
