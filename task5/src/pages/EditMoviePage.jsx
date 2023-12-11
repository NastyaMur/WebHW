import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context";
import FormInput from "../components/FormInput";

const CreateMoviePage = () => {
  const [formState, setFormState] = useState({
    title: "",
    director: "",
    year: "",
    runtime: "",
    plot: "",
    actors: "",
    genres: [],
    posterUrl: "",
  });

  const navigate = useNavigate();

  const { setMovies, selectedMovie, setSelectedMovie } = useAppContext();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/movies/" + id)
        .then((res) => res.json())
        .then((data) => {
          Object.keys(data).length > 0
            ? setSelectedMovie(data)
            : setSelectedMovie(null);
          setFormState(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formState.title.trim() ||
      !formState.director.trim() ||
      !formState.plot.trim() ||
      !formState.actors.trim() ||
      formState.genres.length === 0 ||
      !formState.posterUrl.trim() ||
      !formState.year.trim() ||
      !formState.runtime.trim()
    ) {
      alert("Пожалуйста заполните все значения");
      return;
    }
    fetch("http://localhost:3001/movies/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
        id: selectedMovie.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevState) =>
          prevState.map((movie) => (movie.id === id ? data : movie))
        );
        navigate("/movie/" + id);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.name === "genres"
          ? e.target.value.split(", ")
          : e.target.value,
    });
  };
  if (!selectedMovie) {
    return (
      <div className="home">
        <h1 className="home__title">Фильм номер {id} не найден</h1>
      </div>
    );
  }
  return (
    <div className="movie__form-container">
      <form className="movie__form" onSubmit={handleSubmit}>
        <h1>Редактирование</h1>
        <FormInput
          value={formState?.title}
          onChange={handleChange}
          name="title"
          label="Название фильма"
          placeholder="Введите название фильма"
          type="text"
        />
        <FormInput
          value={formState?.director}
          onChange={handleChange}
          name="director"
          label="Режиссер"
          placeholder="Введите имя режиссера"
          type="text"
        />
        <FormInput
          value={formState?.year}
          onChange={handleChange}
          name="year"
          label="Год выпуска"
          placeholder="Введите год выпуска"
          type="number"
        />
        <FormInput
          value={formState?.runtime}
          onChange={handleChange}
          name="runtime"
          label="Продолжительность"
          placeholder="Введите продолжительность фильма"
          type="number"
        />
        <FormInput
          value={formState?.actors}
          onChange={handleChange}
          name="actors"
          label="Актеры"
          placeholder="Введите актеров (через запятую)"
          type="text"
        />
        <FormInput
          value={formState?.plot}
          onChange={handleChange}
          name="plot"
          label="Описание"
          placeholder="Введите описание фильма"
          textarea
        />
        <FormInput
          value={formState?.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          label="Обложка"
          placeholder="Введите ссылку на обложку"
          type="text"
        />
        <FormInput
          value={formState?.genres.join(", ")}
          onChange={handleChange}
          name="genres"
          label="Жанры"
          placeholder="Введите жанры"
          type="text"
        />
      </form>
      <div className="movie__form-footer">
        <button onClick={() => navigate(-1)}>Отменить</button>
        <button onClick={handleSubmit}>Сохранить</button>
      </div>
    </div>
  );
};

export default CreateMoviePage;
