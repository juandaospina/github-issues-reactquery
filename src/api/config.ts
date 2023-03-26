import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
