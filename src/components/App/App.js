import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import { ConflictError, Unauthorized } from "../../utils/constants/errors";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [savedShortMovies, setSavedShortMovies] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

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
        navigate({ replace: false });
      });
    }
    if (localStorage.getItem("shortMoviesCheckbox") === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
    getAllSavedMovies();
    updatePreviousMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn && shortMovies) {
      const filteredShortMovies = JSON.parse(
        localStorage.getItem("filtered-short-movies")
      );
      filteredShortMovies !== null && updateSearchedMovies(filteredShortMovies);
    } else if (isLoggedIn && !shortMovies) {
      const filteredMovies = JSON.parse(
        localStorage.getItem("filtered-movies")
      );
      filteredMovies !== null && updateSearchedMovies(filteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortMovies]);

  useEffect(() => {
    if (location.pathname !== "/saved-movies") {
      localStorage.removeItem("saved-filtered-movies");
      localStorage.removeItem("saved-filtered-short-movies");
    } else {
      getAllSavedMovies();
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
      }
    } else if (isLoggedIn && !savedShortMovies) {
      const savedFilteredMovies = JSON.parse(
        localStorage.getItem("saved-filtered-movies")
      );
      savedFilteredMovies !== null && setSavedMovies(savedFilteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedShortMovies]);

  function handleClosePopup() {
    setIsOpen(false);
    setErrorMessage("");
  }

  function handleRegister(formValues) {
    apiMain
      .register(formValues)
      .then(() => {
        handleLogin({ email: formValues.email, password: formValues.password });
      })
      .catch((err) => {
        setErrorMessage(
          err === ConflictError.status
            ? ConflictError.errorText
            : "При регистрации пользователя произошла ошибка."
        );
        setIsOpen(true);
      });
  }

  function handleLogin(formValues) {
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
              err === Unauthorized.status
                ? Unauthorized.errorText
                : "При авторизации произошла ошибка."
            );
            setIsOpen(true);
          });
      })
      .catch((err) => {
        setErrorMessage(
          err === Unauthorized.status
            ? Unauthorized.errorText
            : "При авторизации произошла ошибка."
        );
        setIsOpen(true);
      });
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
          err === ConflictError.status
            ? ConflictError.errorText
            : "При обновлении профиля произошла ошибка."
        );
        setIsOpen(true);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setSearchedMovies([]);
    setSavedMovies([]);
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
            (movie) => movie.duration <= 40
          );
          localStorage.setItem(
            "filtered-short-movies",
            JSON.stringify(filteredShortMovies)
          );
          if (shortMovies) {
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
    if (movieToSearch && location.pathname === "/movies") {
      setShortMovies(!shortMovies);
      localStorage.setItem("shortMoviesCheckbox", !shortMovies);
    } else if (movieToSearch && location.pathname === "/saved-movies") {
      setSavedShortMovies(!savedShortMovies);
      localStorage.setItem("savedShortMoviesCheckbox", !savedShortMovies);
    } else {
      setIsOpen(true);
      setErrorMessage("Нужно ввести ключевое слово");
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
      const savedSearchedShortdMovies = savedSearchedMovies.filter(
        (movie) => movie.duration <= 40
      );
      localStorage.setItem(
        "saved-filtered-short-movies",
        JSON.stringify(savedSearchedShortdMovies)
      );
      if (savedShortMovies) {
        setSavedMovies(savedSearchedShortdMovies);
        savedSearchedShortdMovies.length === 0 && setNothingFound(true);
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
        localStorage.setItem("allSavedMovies", JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  }

  function handleSaveMovie(movie) {
    apiMain
      .saveMovie(movie)
      .then((res) => {
        getAllSavedMovies();
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
        getAllSavedMovies();
      })
      .catch(() => {
        setIsOpen(true);
        setErrorMessage("При удалении фильма произошла ошибка.");
      });
  }

  const isSaved = (movie) => {
    const localSavedMovies = JSON.parse(localStorage.getItem("allSavedMovies"));
    if (localSavedMovies) {
      return localSavedMovies.some(
        (movieItem) => movieItem.movieId === movie.id
      );
    }
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
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  onChooseShortMovies={handleChooseShortMovies}
                  shortMoviesCheck={shortMovies}
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

          <Route path="/signin" element={<Login onSignin={handleLogin} />} />

          <Route
            path="/signup"
            element={<Register onSignup={handleRegister} />}
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
