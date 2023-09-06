import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = ({
  savedMoviesArray,
  deleteMovie,
  onSearchMovie,
  nothingFound,
  onChooseShortMovies,
  savedShortMoviesCheck,
}) => {
  return (
    <section className="movies">
      <SearchForm
        onSearchMovie={onSearchMovie}
        onChooseShortMovies={onChooseShortMovies}
        shortMoviesCheck={savedShortMoviesCheck}
      />
      <MoviesCardList
        nothingFound={nothingFound}
        deleteMovie={deleteMovie}
        savedMoviesArray={savedMoviesArray}
      />
    </section>
  );
};

export default SavedMovies;
