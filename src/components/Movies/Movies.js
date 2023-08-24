import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import moviesArray from "../../utils/moviesArray";
// import Preloader from "./Preloader/Preloader";

import "./Movies.css";

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList moviesArray={moviesArray} />
    </section>
  );
};

export default Movies;
