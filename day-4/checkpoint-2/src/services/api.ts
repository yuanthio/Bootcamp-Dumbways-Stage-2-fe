import axios from "axios";

export const api = axios.create({
  baseURL: "http://www.omdbapi.com/?apikey=ad0d7642",
});
