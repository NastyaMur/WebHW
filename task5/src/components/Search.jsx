import { useAppContext } from "../context";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const { searchTerm, setSearchTerm } = useAppContext();
  return (
    <div className="search">
      <div className="search__input">
        <BiSearch className="search__input-icon" />
        <input
          type="text"
          placeholder="Введите название фильма"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="search__button">Искать</button>
    </div>
  );
};

export default Search;
