import { redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth.service";
import { fetchUserAttributes } from "@aws-amplify/auth";

export const handleRouteProtection = async (routeType: string) => {
  try {
    const auth = await isAuthenticated();
    if (routeType === "PROTECTED" && !auth) {
      return redirect("/auth/login");
    } else if (routeType === "UNPROTECTED" && auth) {
      return redirect("/");
    }
    return null;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
    return null;
  }
};

export const homeRouteManagement = async () => {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return redirect("/auth/login");
    }
    const { given_name, family_name } = await fetchUserAttributes();
    if (!given_name || !family_name) {
      return redirect("/auth/signup/complete");
    }
    return null;
    return null;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
    return null;
  }
};
