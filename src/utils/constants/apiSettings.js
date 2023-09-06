import { API_MAIN_URL, API_MOVIES_URL } from "./constants";

const apiMovieSettings = {
  link: API_MOVIES_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const apiMainSettings = {
  link: API_MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export { apiMovieSettings, apiMainSettings };
