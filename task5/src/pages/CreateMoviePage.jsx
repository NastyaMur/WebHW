import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const { setMovies } = useAppContext();

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
    fetch("http://localhost:3001/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
        id: Math.random().toString(12).slice(2),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevState) => [...prevState, data]);
        navigate("/movie/" + data.id);
      })
      .catch((err) => console.log(err));
    setFormState({
      title: "",
      director: "",
      year: "",
      runtime: "",
      plot: "",
      actors: "",
      genres: [],
      posterUrl: "",
    });
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
  return (
    <div className="movie__form-container">
      <form className="movie__form" onSubmit={handleSubmit}>
        <h1>Создание</h1>
        <FormInput
          value={formState.title}
          onChange={handleChange}
          name="title"
          label="Название фильма"
          placeholder="Введите название фильма"
          type="text"
        />
        <FormInput
          value={formState.director}
          onChange={handleChange}
          name="director"
          label="Режиссер"
          placeholder="Введите имя режиссера"
          type="text"
        />
        <FormInput
          value={formState.year}
          onChange={handleChange}
          name="year"
          label="Год выпуска"
          placeholder="Введите год выпуска"
          type="number"
        />
        <FormInput
          value={formState.runtime}
          onChange={handleChange}
          name="runtime"
          label="Продолжительность"
          placeholder="Введите продолжительность фильма"
          type="number"
        />
        <FormInput
          value={formState.actors}
          onChange={handleChange}
          name="actors"
          label="Актеры"
          placeholder="Введите актеров (через запятую)"
          type="text"
        />
        <FormInput
          value={formState.plot}
          onChange={handleChange}
          name="plot"
          label="Описание"
          placeholder="Введите описание фильма"
          textarea
        />
        <FormInput
          value={formState.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          label="Обложка"
          placeholder="Введите ссылку на обложку"
          type="text"
        />
        <FormInput
          value={formState.genres.join(", ")}
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
