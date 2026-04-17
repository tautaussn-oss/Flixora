alias Flixora.Repo
alias Flixora.{Movie, Show, Genre, Actor}

# =====================
# GENRES (više!)
# =====================

genre_names = [
  "Action", "Drama", "Comedy", "Sci-Fi", "Thriller",
  "Romance", "Adventure", "Crime", "Mystery", "Fantasy"
]

genres =
  Enum.map(genre_names, fn name ->
    Repo.insert!(Genre.changeset(%Genre{}, %{name: name}))
  end)

[
  action, drama, comedy, sci_fi, thriller,
  romance, adventure, crime, mystery, fantasy
] = genres

# =====================
# ACTORS
# =====================

actors_data = [
  {"Leonardo DiCaprio", 1974},
  {"Tom Hanks", 1956},
  {"Scarlett Johansson", 1984},
  {"Robert Downey Jr.", 1965},
  {"Brad Pitt", 1963},
  {"Morgan Freeman", 1937},
  {"Keanu Reeves", 1964},
  {"Christian Bale", 1974},
  {"Ryan Reynolds", 1976},
  {"Emma Stone", 1988}
]

actors =
  Enum.map(actors_data, fn {name, year} ->
    Repo.insert!(Actor.changeset(%Actor{}, %{name: name, birth_year: year}))
  end)

[
  leo, tom, scarlett, rdj, brad,
  morgan, keanu, bale, ryan, emma
] = actors

# =====================
# MOVIES (realnije)
# =====================

movies_data = [
  {"Inception",
   "A skilled thief enters dreams to steal secrets but is tasked with planting an idea.",
   2010, 148, "Warner Bros", "Christopher Nolan",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421538/inception_yjxlvn.png",
   [leo], [action, sci_fi, thriller]},

  {"Forrest Gump",
   "A simple man witnesses and influences major historical events while searching for love.",
   1994, 142, "Paramount Pictures", "Robert Zemeckis",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421537/forest_rbzpjv.png",
   [tom], [drama, romance]},

  {"Avengers",
   "Earth's heroes unite to stop a global threat.",
   2012, 143, "Marvel Studios", "Joss Whedon",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421537/avengers_znhzca.png",
   [rdj, scarlett], [action, sci_fi, adventure]},

  {"Fight Club",
   "An underground fight club evolves into chaos.",
   1999, 139, "20th Century Fox", "David Fincher",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421537/fight_g47xfo.png",
   [brad], [drama, thriller, crime]},

  {"Matrix",
   "A hacker learns reality is a simulation.",
   1999, 136, "Warner Bros", "Wachowski Sisters",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421553/matrix_kd8rfr.png",
   [keanu], [action, sci_fi, fantasy]},

  {"The Dark Knight",
   "Batman faces Joker in a battle of chaos.",
   2008, 152, "Warner Bros", "Christopher Nolan",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421664/Screenshot_2026-04-17_at_12.13.14_tw2hos.png",
   [bale], [action, crime, thriller]},

  {"Deadpool",
   "A mercenary with humor seeks revenge.",
   2016, 108, "Marvel Studios", "Tim Miller",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421535/deadpool_rlmjum.png",
   [ryan], [action, comedy]},

  {"La La Land",
   "Love and ambition collide in Los Angeles.",
   2016, 128, "Lionsgate", "Damien Chazelle",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421553/lala_vuvt8p.png",
   [emma], [drama, romance]},

  {"Se7en",
   "Detectives hunt a serial killer based on sins.",
   1995, 127, "New Line Cinema", "David Fincher",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421597/se7en_kdihjk.png",
   [brad, morgan], [crime, thriller, mystery]},

  {"Lucy",
   "A woman unlocks the full potential of her brain.",
   2014, 89, "EuropaCorp", "Luc Besson",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421553/lucy_kw7s5z.png",
   [scarlett], [sci_fi, action]}
]

Enum.each(movies_data, fn {title, desc, year, duration, publisher, director, poster, actors_list, genres_list} ->
  movie =
    %Movie{}
    |> Movie.changeset(%{
      title: title,
      description: desc,
      year: year,
      duration: duration,
      publisher: publisher,
      director: director,
      poster: poster,
      featured: true
    })
    |> Repo.insert!()

  movie
  |> Repo.preload([:actors, :genres])
  |> Ecto.Changeset.change()
  |> Ecto.Changeset.put_assoc(:actors, actors_list)
  |> Ecto.Changeset.put_assoc(:genres, genres_list)
  |> Repo.update!()
end)

# =====================
# SHOWS
# =====================

shows_data = [
  {"Breaking Bad",
   "A teacher turns to crime after a cancer diagnosis.",
   2008, 47, 5, "AMC", "Vince Gilligan",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421537/breaking_ty2cxt.png",
   [morgan], [drama, crime, thriller]},

  {"Stranger Things",
   "Kids face supernatural forces in their town.",
   2016, 50, 4, "Netflix", "Duffer Brothers",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421664/Screenshot_2026-04-17_at_12.13.14_tw2hos.png",
   [emma, ryan], [sci_fi, thriller, mystery]},

  {"Game of Thrones",
   "Families battle for power in a fantasy world.",
   2011, 60, 8, "HBO", "David Benioff",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421539/game_t7ofzq.png",
   [bale, morgan], [drama, fantasy, adventure]},

  {"The Office",
   "Comedy about everyday office life.",
   2005, 22, 9, "NBC", "Greg Daniels",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421554/office_xojaam.png",
   [tom], [comedy]},

  {"Sherlock",
   "Modern detective solving crimes.",
   2010, 90, 4, "BBC", "Mark Gatiss",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421606/sherlock_rg5rus.png",
   [bale], [crime, mystery, thriller]},

  {"Friends",
   "Lives of six friends in New York.",
   1994, 22, 10, "NBC", "David Crane",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421538/friends_wj3hes.png",
   [emma], [comedy, romance]},

  {"Dark",
   "Time travel mystery across generations.",
   2017, 55, 3, "Netflix", "Baran bo Odar",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421538/dark_mxoidc.png",
   [leo], [sci_fi, mystery, thriller]},

  {"The Boys",
   "Dark and violent take on superheroes.",
   2019, 60, 4, "Amazon", "Eric Kripke",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421537/boys_hig9yi.png",
   [ryan], [action, crime]},

  {"Loki",
   "God of mischief explores timelines.",
   2021, 50, 2, "Marvel Studios", "Michael Waldron",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421553/loki_fvxpvj.png",
   [rdj], [sci_fi, fantasy]},

  {"Narcos",
   "Rise of drug cartels in Colombia.",
   2015, 50, 3, "Netflix", "Chris Brancato",
   "https://res.cloudinary.com/datqqcleg/image/upload/v1776421553/narcos_mz0ltj.png",
   [brad], [crime, drama]}
]

Enum.each(shows_data, fn {title, desc, year, duration, season, publisher, director, poster, actors_list, genres_list} ->
  show =
    %Show{}
    |> Show.changeset(%{
      title: title,
      description: desc,
      year: year,
      duration: duration,
      season: season,
      publisher: publisher,
      director: director,
      poster: poster,
      featured: true
    })
    |> Repo.insert!()

  show
  |> Repo.preload([:actors, :genres])
  |> Ecto.Changeset.change()
  |> Ecto.Changeset.put_assoc(:actors, actors_list)
  |> Ecto.Changeset.put_assoc(:genres, genres_list)
  |> Repo.update!()
end)

IO.puts("🔥 PRO SEED DONE!")
