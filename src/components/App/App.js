import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./App.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Popup from "../popup/popup";
import Api from "../../utils/api/MoviesApi";
import MainApi from "../../utils/api/MainApi";
import ProtectedRoute from "../ProtectedRoute";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  apiMovieSettings,
  apiMainSettings,
} from "../../utils/constants/apiSettings";
import { CONFLICT_ERROR, UNAUTHORIZED } from "../../utils/constants/errors";
import { SHORT_MOVIE_DURATION } from "../../utils/constants/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false);
  const [savedShortMovies, setSavedShortMovies] = useState(false);
  const [isLockedBtn, setIsLockedBtn] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allSavedMovies, setAllSavedMovies] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const api = new Api(apiMovieSettings);
  const apiMain = new MainApi(apiMainSettings, apiMovieSettings);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiMain.checkToken(jwt).then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate(location.pathname, { replace: true });
      });
    }
    if (localStorage.getItem("shortMoviesCheckbox") === "true") {
      setShortMoviesCheckbox(true);
    } else {
      setShortMoviesCheckbox(false);
    }
    getAllSavedMovies();
    updatePreviousMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateAllSavedMovies();
    updateSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSavedMovies]);

  useEffect(() => {
    if (isLoggedIn && shortMoviesCheckbox) {
      const filteredShortMovies = JSON.parse(
        localStorage.getItem("filtered-short-movies")
      );
      filteredShortMovies !== null && updateSearchedMovies(filteredShortMovies);
    } else if (isLoggedIn && !shortMoviesCheckbox) {
      const filteredMovies = JSON.parse(
        localStorage.getItem("filtered-movies")
      );
      filteredMovies !== null && updateSearchedMovies(filteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortMoviesCheckbox]);

  useEffect(() => {
    if (location.pathname !== "/saved-movies") {
      localStorage.removeItem("saved-filtered-movies");
      localStorage.removeItem("saved-filtered-short-movies");
      localStorage.removeItem("savedShortMoviesCheckbox");
      setSavedShortMovies(false);
    } else {
      updateSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (isLoggedIn && savedShortMovies) {
      const savedFilteredShortMovies = JSON.parse(
        localStorage.getItem("saved-filtered-short-movies")
      );
      if (savedFilteredShortMovies !== null) {
        savedFilteredShortMovies.length === 0 && setNothingFound(true);
        setSavedMovies(savedFilteredShortMovies);
      } else setNothingFound(true);
    } else if (isLoggedIn && !savedShortMovies) {
      const savedFilteredMovies = JSON.parse(
        localStorage.getItem("saved-filtered-movies")
      );
      savedFilteredMovies !== null && setSavedMovies(savedFilteredMovies);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedShortMovies]);

  function handleClosePopup() {
    setIsOpen(false);
    setErrorMessage("");
  }

  function handleRegister(formValues) {
    setIsLockedBtn(true);
    apiMain
      .register(formValues)
      .then(() => {
        handleLogin({ email: formValues.email, password: formValues.password });
      })
      .catch((err) => {
        setErrorMessage(
          err === CONFLICT_ERROR.status
            ? CONFLICT_ERROR.errorText
            : "При регистрации пользователя произошла ошибка."
        );
        setIsOpen(true);
      })
      .finally(() => setIsLockedBtn(false));
  }

  function handleLogin(formValues) {
    setIsLockedBtn(true);
    apiMain
      .login(formValues)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        apiMain
          .checkToken(res.token)
          .then((res) => {
            setCurrentUser(res);
            setIsLoggedIn(true);
            navigate("/movies");
            getAllSavedMovies();
          })
          .catch((err) => {
            setErrorMessage(
              err === UNAUTHORIZED.status
                ? UNAUTHORIZED.errorText
                : "При авторизации произошла ошибка."
            );
            setIsOpen(true);
          });
      })
      .catch((err) => {
        setErrorMessage(
          err === UNAUTHORIZED.status
            ? UNAUTHORIZED.errorText
            : "При авторизации произошла ошибка."
        );
        setIsOpen(true);
      })
      .finally(() => setIsLockedBtn(false));
  }

  function handleUpdateUser(formValues) {
    apiMain
      .updateUserInfo(formValues)
      .then((res) => {
        setCurrentUser(res);
        setIsOpen(true);
        setErrorMessage("Данные профиля обновлены успешно");
      })
      .catch((err) => {
        setErrorMessage(
          err === CONFLICT_ERROR.status
            ? CONFLICT_ERROR.errorText
            : "При обновлении профиля произошла ошибка."
        );
        setIsOpen(true);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setSearchedMovies([]);
    setSavedMovies([]);
    setAllSavedMovies([]);
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  }

  function updatePreviousMovies() {
    const previousMovies = JSON.parse(localStorage.getItem("searched-movies"));
    previousMovies !== null
      ? updateSearchedMovies(previousMovies)
      : setNothingFound(true);
  }

  function updateSearchedMovies(movies) {
    if (movies.length) {
      setSearchedMovies(movies);
      localStorage.setItem("searched-movies", JSON.stringify(movies));
    } else {
      setSearchedMovies([]);
      setNothingFound(true);
    }
  }

  function handleSearchMovie(movieToSearch) {
    if (!movieToSearch) {
      setIsOpen(true);
      setErrorMessage("Нужно ввести ключевое слово");
    } else {
      setNothingFound(false);
      localStorage.removeItem("searched-movies");
      setSearchedMovies([]);
      setIsPreloader(true);
      api
        .getMoviesList()
        .then((movies) => {
          const filteredMovies = movies.filter(
            (movie) =>
              movie.nameRU
                .toLowerCase()
                .includes(movieToSearch.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())
          );
          localStorage.setItem(
            "filtered-movies",
            JSON.stringify(filteredMovies)
          );
          localStorage.setItem(
            "movie-to-search",
            JSON.stringify(movieToSearch)
          );
          const filteredShortMovies = filteredMovies.filter(
            (movie) => movie.duration <= SHORT_MOVIE_DURATION
          );
          localStorage.setItem(
            "filtered-short-movies",
            JSON.stringify(filteredShortMovies)
          );
          if (shortMoviesCheckbox) {
            updateSearchedMovies(filteredShortMovies);
          } else {
            updateSearchedMovies(filteredMovies);
          }
        })
        .catch((err) => {
          setIsOpen(true);
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setIsPreloader(false);
        });
    }
  }

  function handleChooseShortMovies(movieToSearch) {
    if (location.pathname === "/movies") {
      if (movieToSearch) {
        setShortMoviesCheckbox(!shortMoviesCheckbox);
        localStorage.setItem("shortMoviesCheckbox", !shortMoviesCheckbox);
      } else {
        setIsOpen(true);
        setErrorMessage("Нужно ввести ключевое слово");
      }
    }
    if (location.pathname === "/saved-movies") {
      const savedFilteredShortMovies = JSON.parse(
        localStorage.getItem("saved-filtered-short-movies")
      );
      const savedMoviesArray = JSON.parse(
        localStorage.getItem("allSavedMovies")
      );
      if (savedMoviesArray.length === 0) {
        setIsOpen(true);
        setErrorMessage("Нет сохраненных фильмов");
      } else {
        setSavedShortMovies(!savedShortMovies);
        if (savedMoviesArray.length === 0) {
          setIsOpen(true);
          setErrorMessage("Нет сохраненных фильмов");
        }
        if (!savedFilteredShortMovies) {
          localStorage.setItem("savedShortMoviesCheckbox", !savedShortMovies);
          const savedShortMoviesArray = savedMoviesArray.filter(
            (movie) => movie.duration <= SHORT_MOVIE_DURATION
          );
          if (!savedShortMovies) {
            setSavedMovies(savedShortMoviesArray);
          } else {
            setSavedMovies(savedMoviesArray);
          }
        }
      }
    }
  }

  function handleSearchSavedMovie(movieToSearch) {
    if (!movieToSearch) {
      setIsOpen(true);
      setErrorMessage("Нужно ввести ключевое слово");
    } else {
      setNothingFound(false);
      const localSavedMovies = JSON.parse(
        localStorage.getItem("allSavedMovies")
      );
      const savedSearchedMovies = localSavedMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())
      );
      localStorage.setItem(
        "saved-filtered-movies",
        JSON.stringify(savedSearchedMovies)
      );
      const savedSearchedShortMovies = savedSearchedMovies.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION
      );
      localStorage.setItem(
        "saved-filtered-short-movies",
        JSON.stringify(savedSearchedShortMovies)
      );
      if (savedShortMovies) {
        setSavedMovies(savedSearchedShortMovies);
        savedSearchedShortMovies.length === 0 && setNothingFound(true);
      } else {
        setSavedMovies(savedSearchedMovies);
        savedSearchedMovies.length === 0 && setNothingFound(true);
      }
    }
  }

  function getAllSavedMovies() {
    apiMain
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        setAllSavedMovies(res);
        localStorage.setItem("allSavedMovies", JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  }

  function updateSavedMovies() {
    setSavedMovies(JSON.parse(localStorage.getItem("allSavedMovies")));
  }

  function updateAllSavedMovies() {
    localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
  }

  function handleSaveMovie(movie) {
    apiMain
      .saveMovie(movie)
      .then((res) => {
        setAllSavedMovies([...allSavedMovies, res]);
      })
      .catch((err) => {
        setIsOpen(true);
        setErrorMessage("При сохранении фильма произошла ошибка.");
      });
  }

  function getMovieToDeleteId(movie) {
    const localSavedMovies = JSON.parse(localStorage.getItem("allSavedMovies"));
    if (localSavedMovies) {
      return localSavedMovies.find(
        (movieItem) => movieItem.movieId === movie.id
      )._id;
    }
  }

  function handleDeleteMovie(movie) {
    apiMain
      .deleteMovie(movie)
      .then((res) => {
        setAllSavedMovies((state) =>
          state.filter((savedMovie) => savedMovie._id !== movie)
        );
      })
      .catch(() => {
        setIsOpen(true);
        setErrorMessage("При удалении фильма произошла ошибка.");
      });
  }

  const isSaved = (movie) => {
    return allSavedMovies.some((movieItem) => movieItem.movieId === movie.id);
  };

  function updateMovieStatus(movie) {
    if (!isSaved(movie)) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(getMovieToDeleteId(movie));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  onChooseShortMovies={handleChooseShortMovies}
                  shortMoviesCheck={shortMoviesCheckbox}
                  nothingFound={nothingFound}
                  moviesArray={searchedMovies}
                  isPreloader={isPreloader}
                  onSearchMovie={handleSearchMovie}
                  onSaveMovie={updateMovieStatus}
                  isSaved={isSaved}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  onChooseShortMovies={handleChooseShortMovies}
                  savedShortMoviesCheck={savedShortMovies}
                  nothingFound={nothingFound}
                  onSearchMovie={handleSearchSavedMovie}
                  deleteMovie={handleDeleteMovie}
                  savedMoviesArray={savedMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile onUpdate={handleUpdateUser} onSignout={handleLogout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn}>
                <Login isLockedBtn={isLockedBtn} onSignin={handleLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn}>
                <Register isLockedBtn={isLockedBtn} onSignup={handleRegister} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <Popup
          isOpen={isOpen}
          onClose={handleClosePopup}
          errorMessage={errorMessage}
          overlayClickClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
