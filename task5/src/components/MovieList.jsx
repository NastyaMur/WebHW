import { useAppContext } from "../context";
import Movie from "./Movie";

const MovieList = () => {
  const { movies } = useAppContext();
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
