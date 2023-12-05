import { useAppContext } from "../context";
import { RxCross1 } from "react-icons/rx";

const FilterModal = () => {
  const { setShowFilter, allGenres, setSelectedGenres, selectedGenres } =
    useAppContext();
  return (
    <div
      className="modal"
      onClick={() => {
        setShowFilter(false);
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__body">
        <h1>Выберите категории:</h1>
        <button onClick={() => setShowFilter(false)} className="modal__close">
          <RxCross1 />
        </button>
        <ul className="modal__form">
          {allGenres.map((genre) => (
            <li key={genre}>
              <input
                type="checkbox"
                id={genre}
                checked={selectedGenres.includes(genre)}
                onClick={() => {
                  selectedGenres.includes(genre)
                    ? setSelectedGenres((prevState) =>
                        prevState.filter((g) => genre !== g)
                      )
                    : setSelectedGenres((prevState) => [...prevState, genre]);
                }}
                value={genre}
              />
              <label htmlFor={genre}>{genre}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterModal;
