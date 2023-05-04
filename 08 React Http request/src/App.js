import React, { useCallback, useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLOading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchMoviesHandler = useCallback(async function () {
    setIsLoading(true);
    setErr(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (err) {
      setErr(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLOading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLOading && movies.length === 0 && !err && <p>No movies</p>}
        {isLOading && <p>Is loading!</p>}
        {!isLOading && err && <p>{err}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
