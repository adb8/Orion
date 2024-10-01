import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/data/";

export const authHeader = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  if (email && token) {
    return { Authorization: "Bearer " + token };
  } else {
    return { Authorization: "" };
  }
};

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
}
