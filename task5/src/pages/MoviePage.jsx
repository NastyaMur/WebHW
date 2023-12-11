import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiCopy, BiEdit } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { useAppContext } from "../context";
import Parametr from "../components/Parametr";

const MoviePage = () => {
  const { id } = useParams();

  const [copied, setCopied] = useState(false);

  const { selectedMovie, setSelectedMovie, favorite, setFavorite} = useAppContext();
  // selectedMovie['favorite'] ? setFavorite(selectedMovie.favorite) : favorite;
  const fav = favorite.includes(+id);
  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/movies/" + id)
        .then((res) => res.json())
        .then((data) =>
          Object.keys(data).length > 0
            ? setSelectedMovie(data)
            : setSelectedMovie(null)
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const imgError = (event) => {
    event.target.src = "https://via.placeholder.com/200x300";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!selectedMovie) {
    return (
      <div className="home">
        <h1 className="home__title">Фильм номер {id} не найден</h1>
      </div>
    );
  }
  return (
    <div className="movie__container">
      <div className="movie__header">
        <p>
          Id: {id}
          <button className="movie__copy" onClick={handleCopy}>
            {copied && <IoMdCheckmark />}
            {!copied && <BiCopy />}
          </button>
        </p>
        <Link to={`/editMovie/${id}`}>
          <BiEdit />
          Редактировать
        </Link>
      </div>
      <div className="movie__main">
        <img
          onError={imgError}
          width="200"
          height="300"
          src={selectedMovie?.posterUrl}
          alt={"Film poster"}
        />
        <div className="movie__main-info">
          <h1>{selectedMovie?.title}</h1>
          <h2>{selectedMovie?.director}</h2>
          <h3>Параметры</h3>
          <Parametr name="Год производства" value={selectedMovie?.year} />
          <Parametr
            name="Продолжительность"
            value={`${selectedMovie?.runtime} мин.`}
          />
          <Parametr name="Жанры" value={selectedMovie?.genres.join(", ")} />
          <Parametr name="Актеры" value={selectedMovie?.actors} />
        </div>
      </div>
      <div className="movie__plot">
        <h2>Описание</h2>
        <p>{selectedMovie?.plot}</p>
        <button
            name="favorite"
            onClick={() => {
              if(fav){
                const newFavorite = favorite.filter(item => item != +id);
                setFavorite(newFavorite)
              }
              else{
                setFavorite([...favorite, +id])
              }
            }}
          >
            {fav ? "★" : "☆"}
          </button>
      </div>
    </div>
  );
};

export default MoviePage;
