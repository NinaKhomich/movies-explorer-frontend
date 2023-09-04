import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

import savedMoviesArray from "../../utils/savedMoviesArr";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesArray={savedMoviesArray} />
    </section>
  );
};

export default SavedMovies;
