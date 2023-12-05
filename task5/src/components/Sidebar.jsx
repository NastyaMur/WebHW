import { useAppContext } from "../context";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import MovieList from "./MovieList";

const Sidebar = () => {
  const { movies, setShowFilter } = useAppContext();
  const navigate = useNavigate();
  return (
    <aside>
      <Search />
      <button
        onClick={() => setShowFilter((prevState) => !prevState)}
        className="filter__button"
      >
        Фильтры
      </button>
      <MovieList />
      <div className="sidebar__footer">
        <p>Найдено {movies.length} элементов</p>
        <button onClick={() => navigate("/createMovie")}>
          <AiOutlinePlus />
          Добавить
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
