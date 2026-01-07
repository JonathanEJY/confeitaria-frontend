import axios from "axios";

export const api = axios.create({
  baseURL: "https://ideal-tribble-w9wq64g56552v99q-3000.app.github.dev",
  withCredentials: true,
});
