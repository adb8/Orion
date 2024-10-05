import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./helpers";

const Protected = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const checkAuth = async () => setAuth(await isAuthenticated());
    checkAuth();
  }, []);
  if (auth === null) return null;
  return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default Protected;
