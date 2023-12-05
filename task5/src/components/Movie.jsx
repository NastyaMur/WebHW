import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const { selectedMovie, setSelectedMovie } = useAppContext();

  const handelClick = () => {
    setSelectedMovie(movie);
    navigate("/movie/" + movie.id);
  };

  return (
    <li
      className={`movie ${
        selectedMovie?.id === movie.id ? "movie--selected" : ""
      }`}
      onClick={handelClick}
    >
      <h2 className="movie__title">{movie.title}</h2>
      <div className="movie__info">
        <p>{movie.year}</p>
        <span>{movie.genres.join(", ")}</span>
      </div>
    </li>
  );
};

export default Movie;
