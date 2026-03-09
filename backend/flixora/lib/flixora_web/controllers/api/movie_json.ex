defmodule FlixoraWeb.Api.MovieJSON do
  def index(%{movies: movies}) do
    %{
      movies:
        for(
          movie <- movies,
          do: data(movie)
        )
    }
  end

  defp data(movie) do
    %{
      id: movie.id,
      title: movie.title,
      description: movie.description,
      year: movie.year
    }
  end



   def show(%{movie: movie})  do
    data(movie)

   end


end
