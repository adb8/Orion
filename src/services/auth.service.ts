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
  passwordConfirm,
  rememberMe,
  setEmail,
  setPassword,
  setPasswordConfirm,
  setRememberMe,
  navigate,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
  rememberMe: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}) => {
  console.log(email, password, passwordConfirm, rememberMe);
  switch (true) {
    case !email || !password || !passwordConfirm:
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
    const timestamp = new Date().toISOString();
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          "custom:role": "user",
          "custom:createdAt": timestamp,
        },
      },
    });
    navigate("/auth/finish-signup");
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
  setRememberMe(false);
};

export const completeSignup = async ({
  firstName,
  lastName,
  phoneNumber,
  age,
  country,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setAge,
  setCountry,
  navigate,
  receiveMessages,
  setReceiveMessages,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number | null;
  country: string;
  receiveMessages: boolean;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<number | null>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  navigate: NavigateFunction;
  setReceiveMessages: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(firstName, lastName, phoneNumber, age, country, receiveMessages);
  switch (true) {
    case !firstName || !lastName || !phoneNumber || !age || !country:
      alert("All input fields are required");
      return;
  }
  navigate("/");
  setFirstName("");
  setLastName("");
  setPhoneNumber("");
  setAge(null);
  setCountry("");
  setReceiveMessages(false);
};

export const handleThirdPartyLogin = async ({ provider }: { provider: string }) => {
  return alert(`To be implemented: ${provider}`);
};

export const isAuthenticated = async () => {
  return true;
};

export const providers = [
  { name: "google", icon: FaGoogle },
  { name: "facebook", icon: FaFacebook },
  { name: "twitter", icon: FaTwitter },
];
