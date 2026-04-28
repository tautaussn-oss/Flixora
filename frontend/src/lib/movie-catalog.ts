import { getMovies, resolveMediaImage, resolveTrailerUrl, type ApiMovie } from "./api";

export type CatalogMovie = {
  id: number;
  title: string;
  description: string;
  year: number;
  duration: number | null;
  genres: string[];
  actors: string[];
  poster: string;
  trailer: string;
  featured: boolean;
  spotlightScore: number;
};

export type CatalogActor = {
  name: string;
  appearances: number;
  latestYear: number;
  posters: string[];
};

export type ActorGroup = {
  title: string;
  description: string;
  actors: CatalogActor[];
};

export type MovieCatalog = {
  movies: CatalogMovie[];
  genres: string[];
  actors: CatalogActor[];
  years: number[];
  heroMovies: CatalogMovie[];
  trendingMovies: CatalogMovie[];
  spotlightMovies: CatalogMovie[];
  awardMovies: CatalogMovie[];
  actorGroups: ActorGroup[];
};

let catalogCache: MovieCatalog | null = null;
let catalogPromise: Promise<MovieCatalog> | null = null;

function computeSpotlightScore(movie: CatalogMovie) {
  const featuredBoost = movie.featured ? 30 : 0;
  const recencyBoost = Math.max(0, movie.year - 2000);
  const castBoost = Math.min(movie.actors.length * 3, 12);
  const genreBoost = Math.min(movie.genres.length * 2, 6);

  return featuredBoost + recencyBoost + castBoost + genreBoost;
}

function normalizeMovie(movie: ApiMovie): CatalogMovie {
  const normalized: CatalogMovie = {
    id: movie.id,
    title: movie.title,
    description:
      movie.description?.trim() ||
      "A cinematic pick from the Flixora catalog, ready for trailer-first browsing.",
    year: movie.year ?? 0,
    duration: movie.duration ?? null,
    genres: movie.genres?.map((genre) => genre.name).filter(Boolean) ?? [],
    actors: movie.actors?.map((actor) => actor.name).filter(Boolean) ?? [],
    poster: resolveMediaImage(movie.poster ?? ""),
    trailer: resolveTrailerUrl(movie.trailer ?? ""),
    featured: Boolean(movie.featured),
    spotlightScore: 0,
  };

  normalized.spotlightScore = computeSpotlightScore(normalized);
  return normalized;
}

function sortBySpotlight(a: CatalogMovie, b: CatalogMovie) {
  if (a.spotlightScore !== b.spotlightScore) {
    return b.spotlightScore - a.spotlightScore;
  }

  if (a.year !== b.year) {
    return b.year - a.year;
  }

  return a.title.localeCompare(b.title);
}

function buildActorGroups(movies: CatalogMovie[]): ActorGroup[] {
  const actorMap = new Map<string, CatalogActor>();

  for (const movie of movies) {
    for (const actorName of movie.actors) {
      const existing = actorMap.get(actorName);

      if (existing) {
        existing.appearances += 1;
        existing.latestYear = Math.max(existing.latestYear, movie.year);
        if (existing.posters.length < 3 && !existing.posters.includes(movie.poster)) {
          existing.posters.push(movie.poster);
        }
        continue;
      }

      actorMap.set(actorName, {
        name: actorName,
        appearances: 1,
        latestYear: movie.year,
        posters: movie.poster ? [movie.poster] : [],
      });
    }
  }

  const actors = Array.from(actorMap.values());
  const popular = [...actors]
    .sort((a, b) => {
      if (a.appearances !== b.appearances) {
        return b.appearances - a.appearances;
      }

      return b.latestYear - a.latestYear;
    })
    .slice(0, 4);

  const awardPicks = [...actors]
    .sort((a, b) => {
      if (a.latestYear !== b.latestYear) {
        return b.latestYear - a.latestYear;
      }

      return b.appearances - a.appearances;
    })
    .filter((actor) => !popular.some((item) => item.name === actor.name))
    .slice(0, 4);

  const rising = [...actors]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      (actor) =>
        !popular.some((item) => item.name === actor.name) &&
        !awardPicks.some((item) => item.name === actor.name),
    )
    .slice(0, 4);

  return [
    {
      title: "Popular Cast",
      description: "Names that show up across the strongest titles in the catalog.",
      actors: popular,
    },
    {
      title: "Award Picks",
      description: "Cast members tied to the most recent spotlight selections.",
      actors: awardPicks,
    },
    {
      title: "Rising Names",
      description: "Fresh faces you can surface without loading separate people endpoints.",
      actors: rising,
    },
  ];
}

function buildCatalog(movies: CatalogMovie[]): MovieCatalog {
  const sortedBySpotlight = [...movies].sort(sortBySpotlight);
  const genres = Array.from(
    new Set(
      movies.flatMap((movie) => movie.genres).filter((genre) => genre.trim().length > 0),
    ),
  );
  const years = Array.from(new Set(movies.map((movie) => movie.year).filter(Boolean))).sort(
    (a, b) => b - a,
  );
  const actorGroups = buildActorGroups(sortedBySpotlight);
  const actors = actorGroups.flatMap((group) => group.actors);

  return {
    movies: sortedBySpotlight,
    genres,
    actors,
    years,
    heroMovies: sortedBySpotlight.slice(0, 5),
    trendingMovies: sortedBySpotlight.slice(0, 8),
    spotlightMovies: sortedBySpotlight.slice(0, 10),
    awardMovies: sortedBySpotlight.slice(2, 6),
    actorGroups,
  };
}

export async function getMovieCatalog(forceRefresh = false): Promise<MovieCatalog> {
  if (!forceRefresh && catalogCache) {
    return catalogCache;
  }

  if (!forceRefresh && catalogPromise) {
    return catalogPromise;
  }

  catalogPromise = getMovies()
    .then((movies) => buildCatalog(movies.map(normalizeMovie)))
    .then((catalog) => {
      catalogCache = catalog;
      return catalog;
    })
    .finally(() => {
      catalogPromise = null;
    });

  return catalogPromise;
}
