defmodule FlixoraWeb.GenreController do

  use FlixoraWeb,:controller

  alias Flixora.Movies.Genre
  alias Flixora.Movies



  def index(conn, _params ) do

    genres = Movies.list_genres()
      render(conn, :index, genres: genres )

  end


end
