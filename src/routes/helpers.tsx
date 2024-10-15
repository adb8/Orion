import { redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth.service";

export const handleRouteProtection = async (routeType: string) => {
  const auth = await isAuthenticated();
  if (routeType === "PROTECTED" && !auth) {
    return redirect("/auth/login");
  } else if (routeType === "UNPROTECTED" && auth) {
    return redirect("/");
  }
  return null;
};
