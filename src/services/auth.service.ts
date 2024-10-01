import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { NavigateFunction } from "react-router-dom";
import { signIn, signUp } from "@aws-amplify/auth";

export const handleLogin = async ({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  navigate,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}) => {
  console.log(email, password, rememberMe);
  if (!email || !password) {
    const error = "All input fields are required";
    alert(error);
    return;
  }
  try {
    await signIn({
      username: email,
      password: password,
    });
    navigate("/");
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  }
  setEmail("");
  setPassword("");
  setRememberMe(false);
};

export const handleSignup = async ({
  email,
  password,
  name,
  passwordConfirm,
  rememberMe,
  setEmail,
  setPassword,
  setName,
  setPasswordConfirm,
  setRememberMe,
  navigate,
}: {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
  rememberMe: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}) => {
  console.log(email, password, passwordConfirm, name, rememberMe);
  switch (true) {
    case !email || !password || !passwordConfirm || !name:
      alert("All input fields are required");
      return;
    case password !== passwordConfirm:
      alert("Passwords do not match");
      return;
    case password.length < 6:
      alert("Password length must be greater than 8 characters");
      return;
    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      alert("Invalid email format");
      return;
  }
  try {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
          createdAt: new Date().toISOString(),
          role: "user",
        },
      },
    });
    navigate("/");
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  }
  setEmail("");
  setPassword("");
  setPasswordConfirm("");
  setName("");
  setRememberMe(false);
};

export const handleThirdPartyLogin = async ({ provider }: { provider: string }) => {
  return alert(`To be implemented: ${provider}`);
};

export const logout = ({ navigate }: { navigate: NavigateFunction }) => {
  localStorage.removeItem("user");
  navigate("/login");
};

export const getEmail = () => {
  const user = localStorage.getItem("user");
  const email = user ? JSON.parse(user).email : null;
  return email;
};

export const getName = () => {
  const user = localStorage.getItem("user");
  const name = user ? JSON.parse(user).name : null;
  return name;
};

export const getToken = () => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).accessToken : null;
  return token;
};

export const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export const providers = [
  { name: "google", icon: FaGoogle },
  { name: "facebook", icon: FaFacebook },
  { name: "twitter", icon: FaTwitter },
];
