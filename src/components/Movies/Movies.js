import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

import "./Movies.css";

const Movies = ({
  isPreloader,
  onSearchMovie,
  moviesArray,
  nothingFound,
  onSaveMovie,
  isSaved,
  onChooseShortMovies,
  shortMoviesCheck,
}) => {
  return (
    <section className="movies">
      <SearchForm
        shortMoviesCheck={shortMoviesCheck}
        onChooseShortMovies={onChooseShortMovies}
        onSearchMovie={onSearchMovie}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        isSaved={isSaved}
        onSaveMovie={onSaveMovie}
        nothingFound={nothingFound}
        moviesArray={moviesArray}
      />
    </section>
  );
};

export default Movies;
