alias Flixora.Repo
alias Flixora.Movies.Movie
movies =
[
  %Movie{
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    year: 2010
  },
  %Movie{
    title: "The Matrix",
    description: "A hacker discovers the reality he lives in is a simulation.",
    year: 1999
  },
  %Movie{
    title: "Interstellar",
    description: "A team travels through a wormhole in search of a new home for humanity.",
    year: 2014
  },
  %Movie{
    title: "The Dark Knight",
    description: "Batman faces the Joker, a criminal mastermind who spreads chaos.",
    year: 2008
  },
  %Movie{
    title: "Gladiator",
    description: "A Roman general seeks revenge against the corrupt emperor.",
    year: 2000
  },
  %Movie{
    title: "Titanic",
    description: "A romance unfolds aboard the ill-fated Titanic ship.",
    year: 1997
  },
  %Movie{
    title: "Avengers: Endgame",
    description: "The Avengers assemble for a final battle against Thanos.",
    year: 2019
  },
  %Movie{
    title: "Parasite",
    description: "A poor family schemes to infiltrate a wealthy household.",
    year: 2019
  },
  %Movie{
    title: "Joker",
    description: "A mentally troubled comedian descends into madness.",
    year: 2019
  },
  %Movie{
    title: "Forrest Gump",
    description: "The story of a man with a low IQ who influences historic events.",
    year: 1994
  }
] |>
 Enum.each(fn movie ->  Repo.insert!(movie) end )
