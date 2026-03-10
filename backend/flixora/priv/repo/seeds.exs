alias Flixora.Repo
alias Flixora.Movies.Movie

movies =
  [
    %Movie{
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      year: 2010,
      image_path: "inception.jpg"
    },
    %Movie{
      title: "The Matrix",
      description: "A hacker discovers the reality he lives in is a simulation.",
      year: 1999,
      image_path: "matrix.jpg"
    },
    %Movie{
      title: "Interstellar",
      description: "A team travels through a wormhole in search of a new home for humanity.",
      year: 2014,
      image_path: "interstellar.jpg"
    },
    %Movie{
      title: "The Dark Knight",
      description: "Batman faces the Joker, a criminal mastermind who spreads chaos.",
      year: 2008,
      image_path: "dark_knight.jpg"
    },
    %Movie{
      title: "Gladiator",
      description: "A Roman general seeks revenge against the corrupt emperor.",
      year: 2000,
      image_path: "gladiator.jpg"
    },
    %Movie{
      title: "Titanic",
      description: "A romance unfolds aboard the ill-fated Titanic ship.",
      year: 1997,
      image_path: "titanic.jpg"
    },
    %Movie{
      title: "Avengers: Endgame",
      description: "The Avengers assemble for a final battle against Thanos.",
      year: 2019,
      image_path: "avengers.jpg"
    },
    %Movie{
      title: "Parasite",
      description: "A poor family schemes to infiltrate a wealthy household.",
      year: 2019,
      image_path: "parasite.jpg"
    },
    %Movie{
      title: "Joker",
      description: "A mentally troubled comedian descends into madness.",
      year: 2019,
      image_path: "joker.jpg"
    },
    %Movie{
      title: "Forrest Gump",
      description: "The story of a man with a low IQ who influences historic events.",
      year: 1994,
      image_path: "forrest_gump.jpg"
    },
    %Movie{
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over years, finding redemption through acts of decency.",
      year: 1994,
      image_path: "shawshank.jpg"
    },
    %Movie{
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen intertwine in a series of crime stories.",
      year: 1994,
      image_path: "pulp_fiction.jpg"
    },
    %Movie{
      title: "Fight Club",
      description: "An office worker forms an underground fight club with a soap salesman.",
      year: 1999,
      image_path: "fight_club.jpg"
    },
    %Movie{
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description: "A young hobbit begins a journey to destroy a powerful ring.",
      year: 2001,
      image_path: "lotr1.jpg"
    },
    %Movie{
      title: "The Lord of the Rings: The Two Towers",
      description: "The fellowship is broken but continues the quest against Sauron.",
      year: 2002,
      image_path: "lotr2.jpg"
    },
    %Movie{
      title: "The Lord of the Rings: The Return of the King",
      description: "The final battle for Middle-earth begins.",
      year: 2003,
      image_path: "lotr3.jpg"
    },
    %Movie{
      title: "Django Unchained",
      description: "A freed slave teams up with a bounty hunter to rescue his wife.",
      year: 2012,
      image_path: "django.jpg"
    },
    %Movie{
      title: "The Wolf of Wall Street",
      description: "A stockbroker rises and falls through greed and corruption.",
      year: 2013,
      image_path: "wolf_wall_street.jpg"
    },
    %Movie{
      title: "Whiplash",
      description: "A young drummer pushes himself to greatness under a brutal instructor.",
      year: 2014,
      image_path: "whiplash.jpg"
    },
    %Movie{
      title: "Top Gun: Maverick",
      description: "A legendary pilot returns to train a new generation of fighter pilots.",
      year: 2022,
      image_path: "topgun.jpg"
    }
  ]

Enum.each(movies, fn movie -> Repo.insert!(movie) end)
