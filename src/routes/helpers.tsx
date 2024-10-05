import { redirect } from "react-router-dom";

export const handleProtected = async () => {
  const auth = await isAuthenticated();
  if (!auth) {
    return redirect("/auth/login");
  }
  return null;
};

export const handleUnprotected = async () => {
  const auth = await isAuthenticated();
  if (auth) {
    return redirect("/");
  }
  return null
};

export const isAuthenticated = async () => {
  return true;
};