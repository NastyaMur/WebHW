import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [favorite, setFavorite] = useState([1]);

  useEffect(() => {
    fetch("http://localhost:3001/movies/?q=" + searchTerm)
      .then((res) => res.json())
      .then((data) =>
        setMovies(
          data.filter((movie) =>
            selectedGenres.every((genre) => movie.genres.includes(genre))
          )
        )
      )
      .catch((err) => {
        console.error(err);
      });
  }, [searchTerm, selectedGenres]);

  useEffect(() => {
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((data) => setAllGenres(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        movies,
        setMovies,
        searchTerm,
        setSearchTerm,
        selectedMovie,
        setSelectedMovie,
        allGenres,
        setAllGenres,
        selectedGenres,
        setSelectedGenres,
        showFilter,
        setShowFilter,
        favorite,
        setFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
