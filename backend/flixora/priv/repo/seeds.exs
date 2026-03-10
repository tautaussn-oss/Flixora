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
    },
    %Movie{
  title: "The Shawshank Redemption",
  description: "Two imprisoned men bond over years, finding redemption through acts of decency.",
  year: 1994
},
%Movie{
  title: "Pulp Fiction",
  description: "The lives of two mob hitmen intertwine in a series of crime stories.",
  year: 1994
},
%Movie{
  title: "Fight Club",
  description: "An office worker forms an underground fight club with a soap salesman.",
  year: 1999
},
%Movie{
  title: "The Lord of the Rings: The Fellowship of the Ring",
  description: "A young hobbit begins a journey to destroy a powerful ring.",
  year: 2001
},
%Movie{
  title: "The Lord of the Rings: The Two Towers",
  description: "The fellowship is broken but continues the quest against Sauron.",
  year: 2002
},
%Movie{
  title: "The Lord of the Rings: The Return of the King",
  description: "The final battle for Middle-earth begins.",
  year: 2003
},
%Movie{
  title: "Django Unchained",
  description: "A freed slave teams up with a bounty hunter to rescue his wife.",
  year: 2012
},
%Movie{
  title: "The Wolf of Wall Street",
  description: "A stockbroker rises and falls through greed and corruption.",
  year: 2013
},
%Movie{
  title: "Whiplash",
  description: "A young drummer pushes himself to greatness under a brutal instructor.",
  year: 2014
},
%Movie{
  title: "Top Gun: Maverick",
  description: "A legendary pilot returns to train a new generation of fighter pilots.",
  year: 2022
}
  ]
  |> Enum.each(fn movie -> Repo.insert!(movie) end)
