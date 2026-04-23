"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CalendarDays,
  Clock3,
  Film,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tags,
  User,
} from "lucide-react";
import TrailerModal from "@/components/home/TrailerModal";
import {
  getActors,
  getGenres,
  getMovies,
  resolveMediaImage,
  resolveTrailerUrl,
  type ApiActor,
  type ApiGenre,
  type ApiMovie,
} from "@/src/lib/api";

type MovieItem = {
  id: number;
  title: string;
  description: string;
  year: number;
  duration: number;
  featured: boolean;
  kids: boolean;
  genreNames: string[];
  actorNames: string[];
  posterUrl: string;
  trailerUrl: string;
};

type SortOption =
  | "featured"
  | "newest"
  | "oldest"
  | "title-asc"
  | "title-desc"
  | "duration-desc";

type DurationFilter = "all" | "short" | "medium" | "long";

const PAGE_SIZE = 12;

function toMovieItem(movie: ApiMovie): MovieItem {
  return {
    id: movie.id,
    title: movie.title,
    description:
      movie.description?.trim() ||
      "A cinematic story with a trailer-first experience on Flixora.",
    year: movie.year ?? 0,
    duration: movie.duration ?? 0,
    featured: Boolean(movie.featured),
    kids: Boolean(movie.kids),
    genreNames: movie.genres?.map((genre) => genre.name) ?? [],
    actorNames: movie.actors?.map((actor) => actor.name) ?? [],
    posterUrl: resolveMediaImage(movie.poster ?? ""),
    trailerUrl: resolveTrailerUrl(movie.trailer ?? ""),
  };
}

export default function MoviePageClient() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [genres, setGenres] = useState<ApiGenre[]>([]);
  const [actors, setActors] = useState<ApiActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedActor, setSelectedActor] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [durationFilter, setDurationFilter] = useState<DurationFilter>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [kidsOnly, setKidsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const [trailerModal, setTrailerModal] = useState<{
    open: boolean;
    url: string;
    title: string;
  }>({
    open: false,
    url: "",
    title: "",
  });

  const openTrailer = (movie: MovieItem) => {
    if (!movie.trailerUrl) return;

    setTrailerModal({ open: true, url: movie.trailerUrl, title: movie.title });
  };

  const closeTrailer = () => {
    setTrailerModal({ open: false, url: "", title: "" });
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [movieData, genreData, actorData] = await Promise.all([
        getMovies(),
        getGenres(),
        getActors(),
      ]);

      setMovies(movieData.map(toMovieItem));
      setGenres(genreData);
      setActors(actorData);
    } catch (err) {
      console.error("Failed to load movies page data", err);
      setError("Failed to load movies. Please retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    query,
    selectedGenre,
    selectedActor,
    selectedYear,
    durationFilter,
    featuredOnly,
    kidsOnly,
    sortBy,
  ]);

  const years = useMemo(() => {
    return Array.from(new Set(movies.map((movie) => movie.year)))
      .filter((year) => Number.isFinite(year) && year > 0)
      .sort((a, b) => b - a);
  }, [movies]);

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = movies.filter((movie) => {
      if (normalizedQuery) {
        const inTitle = movie.title.toLowerCase().includes(normalizedQuery);
        const inDescription = movie.description
          .toLowerCase()
          .includes(normalizedQuery);
        const inGenre = movie.genreNames.some((genre) =>
          genre.toLowerCase().includes(normalizedQuery),
        );

        if (!inTitle && !inDescription && !inGenre) {
          return false;
        }
      }

      if (
        selectedGenre !== "all" &&
        !movie.genreNames.includes(selectedGenre)
      ) {
        return false;
      }

      if (
        selectedActor !== "all" &&
        !movie.actorNames.includes(selectedActor)
      ) {
        return false;
      }

      if (selectedYear !== "all" && String(movie.year) !== selectedYear) {
        return false;
      }

      if (
        durationFilter === "short" &&
        !(movie.duration > 0 && movie.duration < 100)
      ) {
        return false;
      }

      if (
        durationFilter === "medium" &&
        !(movie.duration >= 100 && movie.duration <= 140)
      ) {
        return false;
      }

      if (durationFilter === "long" && !(movie.duration > 140)) {
        return false;
      }

      if (featuredOnly && !movie.featured) {
        return false;
      }

      if (kidsOnly && !movie.kids) {
        return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }

        return b.year - a.year;
      }

      if (sortBy === "newest") return b.year - a.year;
      if (sortBy === "oldest") return a.year - b.year;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "duration-desc") return b.duration - a.duration;

      return 0;
    });
  }, [
    movies,
    query,
    selectedGenre,
    selectedActor,
    selectedYear,
    durationFilter,
    featuredOnly,
    kidsOnly,
    sortBy,
  ]);

  const visibleMovies = filteredMovies.slice(0, visibleCount);

  const clearFilters = () => {
    setQuery("");
    setSelectedGenre("all");
    setSelectedActor("all");
    setSelectedYear("all");
    setDurationFilter("all");
    setFeaturedOnly(false);
    setKidsOnly(false);
    setSortBy("featured");
  };

  return (
    <>
      <div className="relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <section
            className="relative overflow-hidden rounded-[2rem] border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, var(--surface-strong)) 0%, var(--surface-strong) 65%)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <p
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  <Sparkles size={14} />
                  Movies Catalog
                </p>

                <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Discover, filter, and explore every movie trailer in Flixora.
                </h1>

                <p
                  className="mt-4 max-w-2xl text-sm leading-7 md:text-base"
                  style={{ color: "var(--muted)" }}
                >
                  Search by title, filter by genres, actors, release year,
                  duration, and sort exactly how you want.
                </p>
              </div>

              <div className="grid min-w-[210px] gap-3 sm:grid-cols-2">
                <MetricCard
                  label="Total Movies"
                  value={String(movies.length)}
                />
                <MetricCard
                  label="Filtered Result"
                  value={loading ? "..." : String(filteredMovies.length)}
                />
                <MetricCard
                  label="Featured"
                  value={String(
                    movies.filter((movie) => movie.featured).length,
                  )}
                />
                <MetricCard
                  label="Kids"
                  value={String(movies.filter((movie) => movie.kids).length)}
                />
              </div>
            </div>
          </section>

          <section
            className="mt-8 rounded-3xl border p-5 md:p-6"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="inline-flex items-center gap-2 text-lg font-semibold md:text-xl">
                <SlidersHorizontal size={18} />
                Filters & Controls
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface-strong)",
                }}
              >
                Reset filters
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <label
                className="flex items-center gap-2 rounded-2xl border px-3 py-2"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface-strong)",
                }}
              >
                <Search size={16} style={{ color: "var(--muted)" }} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, description, genre..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>

              <SelectField
                value={selectedGenre}
                onChange={setSelectedGenre}
                icon={<Tags size={16} />}
                options={["all", ...genres.map((genre) => genre.name)]}
                formatLabel={(value) =>
                  value === "all" ? "All genres" : value
                }
              />

              <SelectField
                value={selectedActor}
                onChange={setSelectedActor}
                icon={<User size={16} />}
                options={["all", ...actors.map((actor) => actor.name)]}
                formatLabel={(value) =>
                  value === "all" ? "All actors" : value
                }
              />

              <SelectField
                value={selectedYear}
                onChange={setSelectedYear}
                icon={<CalendarDays size={16} />}
                options={["all", ...years.map(String)]}
                formatLabel={(value) => (value === "all" ? "All years" : value)}
              />

              <SelectField
                value={durationFilter}
                onChange={(value) => setDurationFilter(value as DurationFilter)}
                icon={<Clock3 size={16} />}
                options={["all", "short", "medium", "long"]}
                formatLabel={(value) => {
                  if (value === "all") return "All durations";
                  if (value === "short") return "Short (<100m)";
                  if (value === "medium") return "Medium (100-140m)";
                  return "Long (>140m)";
                }}
              />

              <SelectField
                value={sortBy}
                onChange={(value) => setSortBy(value as SortOption)}
                icon={<RefreshCcw size={16} />}
                options={[
                  "featured",
                  "newest",
                  "oldest",
                  "title-asc",
                  "title-desc",
                  "duration-desc",
                ]}
                formatLabel={(value) => {
                  if (value === "featured") return "Sort: Featured";
                  if (value === "newest") return "Sort: Newest";
                  if (value === "oldest") return "Sort: Oldest";
                  if (value === "title-asc") return "Sort: Title A-Z";
                  if (value === "title-desc") return "Sort: Title Z-A";
                  return "Sort: Duration";
                }}
              />

              <ToggleChip
                checked={featuredOnly}
                onChange={setFeaturedOnly}
                label="Featured only"
              />
              <ToggleChip
                checked={kidsOnly}
                onChange={setKidsOnly}
                label="Kids only"
              />
            </div>
          </section>

          <section className="mt-8">
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border p-4"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--surface)",
                    }}
                  >
                    <div className="skeleton-shimmer h-52 rounded-2xl" />
                    <div className="skeleton-shimmer mt-4 h-5 w-2/3 rounded" />
                    <div className="skeleton-shimmer mt-2 h-4 w-full rounded" />
                    <div className="skeleton-shimmer mt-2 h-4 w-5/6 rounded" />
                    <div className="skeleton-shimmer mt-4 h-10 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className="rounded-3xl border p-6"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <p style={{ color: "var(--muted)" }}>{error}</p>
                <button
                  type="button"
                  onClick={loadData}
                  className="mt-4 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Retry
                </button>
              </div>
            ) : visibleMovies.length === 0 ? (
              <div
                className="rounded-3xl border p-6"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <p style={{ color: "var(--muted)" }}>
                  No movies match the current filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
                  Showing{" "}
                  <span className="font-semibold">{visibleMovies.length}</span>{" "}
                  of{" "}
                  <span className="font-semibold">{filteredMovies.length}</span>{" "}
                  results
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleMovies.map((movie, index) => (
                    <article
                      key={movie.id}
                      className="home-card-glow home-stagger-item relative overflow-hidden rounded-3xl border"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--card)",
                        animationDelay: `${index * 55}ms`,
                      }}
                    >
                      <div
                        className="relative h-52"
                        style={{
                          backgroundImage: `url(${movie.posterUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/8" />

                        <div className="absolute left-4 top-4 flex items-center gap-2">
                          {movie.featured ? (
                            <span className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white">
                              Featured
                            </span>
                          ) : null}
                          {movie.kids ? (
                            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
                              Kids
                            </span>
                          ) : null}
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="line-clamp-1 text-xl font-bold">
                            {movie.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-white/80">
                            {movie.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 p-4">
                        <div
                          className="flex flex-wrap gap-2 text-xs"
                          style={{ color: "var(--muted)" }}
                        >
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={14} /> {movie.year || "N/A"}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={14} />{" "}
                            {movie.duration ? `${movie.duration} min` : "N/A"}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Tags size={14} />{" "}
                            {movie.genreNames[0] ?? "General"}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openTrailer(movie)}
                            disabled={!movie.trailerUrl}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                            style={{
                              backgroundColor: "var(--accent)",
                              boxShadow: "var(--shadow-accent)",
                            }}
                          >
                            <Film size={15} /> Watch Trailer
                          </button>

                          <Link
                            href={`/movie/${movie.id}`}
                            className="rounded-full border px-4 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                            style={{ borderColor: "var(--border)" }}
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {visibleCount < filteredMovies.length ? (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((prev) => prev + PAGE_SIZE)
                      }
                      className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "var(--accent)",
                        boxShadow: "var(--shadow-accent)",
                      }}
                    >
                      Load more movies
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>

      <TrailerModal
        open={trailerModal.open}
        trailerUrl={trailerModal.url}
        title={trailerModal.title}
        onClose={closeTrailer}
      />
    </>
  );
}

function SelectField({
  value,
  onChange,
  icon,
  options,
  formatLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  options: string[];
  formatLabel: (value: string) => string;
}) {
  return (
    <label
      className="flex items-center gap-2 rounded-2xl border px-3 py-2"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface-strong)",
      }}
    >
      <span style={{ color: "var(--muted)" }}>{icon}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleChip({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="rounded-2xl border px-4 py-2 text-left text-sm font-medium transition duration-300"
      style={{
        borderColor: checked ? "transparent" : "var(--border)",
        backgroundColor: checked ? "var(--accent)" : "var(--surface-strong)",
        color: checked ? "white" : "var(--text)",
      }}
    >
      {label}
    </button>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl border p-3"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
