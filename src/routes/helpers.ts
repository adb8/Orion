import { redirect } from "react-router-dom";

export const isAuthenticated = async () => {
  const user = localStorage.getItem("user");
  if (user) throw redirect("/");
  return null;
};

export const handleProtected = async () => {
  const token = localStorage.getItem("token");
  if (token) throw redirect("/login");
  return null;
};
