import { useEffect, useState } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

const SearchForm = ({
  onSearchMovie,
  onChooseShortMovies,
  shortMoviesCheck,
}) => {
  const [movieToSearch, setMovieToSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setMovieToSearch("");
    } else {
      const previousMovieToSearch = JSON.parse(
        localStorage.getItem("movie-to-search")
      );
      setMovieToSearch(previousMovieToSearch);
    }
  }, [location.pathname]);

  const handleOnChange = (e) => {
    setMovieToSearch(e.target.value);
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    onSearchMovie(movieToSearch);
  };

  const handleChooseMovieDuration = () => {
    onChooseShortMovies(movieToSearch);
  };

  return (
    <form onSubmit={handlSubmit} className="search-form">
      <label htmlFor="movie" className="search-form__label">
        <input
          className="search-form__input"
          value={movieToSearch ?? ""}
          onChange={handleOnChange}
          id="movie"
          type="text"
          name="movie"
          placeholder="Фильм"
        />
        <span className="search-form__input-error"></span>
      </label>
      <button className="search-form__button" type="submit">
        Поиск
      </button>

      <label
        className="search-form__checkbox-label"
        htmlFor="search-form-checkbox"
      >
        <input
          className="search-form__checkbox"
          id="search-form-checkbox"
          name="checkbox"
          type="checkbox"
          onChange={handleChooseMovieDuration}
          checked={shortMoviesCheck && "checked"}
        ></input>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
};

export default SearchForm;
