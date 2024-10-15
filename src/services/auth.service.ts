import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { NavigateFunction } from "react-router-dom";
import { signIn, signUp, getCurrentUser, confirmSignUp } from "@aws-amplify/auth";
import { useAuth } from "../components/AuthProvider";

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
  const { isAuthenticated, user, setUser } = useAuth();
  if (!email || !password) {
    const error = "All input fields are required";
    alert(error);
    return;
  }
  try {
    const { nextStep } = await signIn({
      username: email,
      password: password,
    });
    console.log("nextStep", nextStep);
    navigate("/");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
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
  const { isAuthenticated, user, setUser } = useAuth();
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
    const role = "user";
    let user = {
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email,
          "custom:role": role,
          "custom:createdAt": timestamp,
        },
      },
    };
    const { isSignUpComplete, userId, nextStep } = await signUp(user);
    console.log("isSignUpComplete", isSignUpComplete);
    console.log("userId", userId);
    console.log("nextStep", nextStep);
    // navigate("/auth/complete");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
  setEmail("");
  setPassword("");
  setPasswordConfirm("");
  setRememberMe(false);
};

export const handleSignupComplete = async ({
  firstName,
  lastName,
  phoneNumber,
  age,
  country,
  gender,
  setGender,
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
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<number | null>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  navigate: NavigateFunction;
  setReceiveMessages: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(firstName, lastName, phoneNumber, age, country, receiveMessages, gender);
  switch (true) {
    case !firstName || !lastName || !phoneNumber || !age || !country || !gender:
      alert("All input fields are required");
      return;
  }
  try {
    let user = JSON.parse(localStorage.getItem("user") || "");
    if (!user) throw new Error("User not found");
    user = {
      ...user,
      attributes: {
        ...user.attributes,
        given_name: firstName,
        family_name: lastName,
        phone_number: phoneNumber,
        gender: gender,
        "custom:age": age,
        "custom:country": country,
        "custom:receiveMessages": receiveMessages,
      },
    };
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    const { nextStep } = await signUp(user);
    console.log("nextStep", nextStep);
  } catch (error) {}
  navigate("/");
  setFirstName("");
  setLastName("");
  setPhoneNumber("");
  setAge(null);
  setCountry("");
  setGender("");
  setReceiveMessages(false);
};

export const handleThirdPartyLogin = async ({ provider }: { provider: string }) => {
  return alert(`To be implemented: ${provider}`);
};

export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser();
    if (user) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
  return false;
};

export const providers = [
  { name: "google", icon: FaGoogle },
  { name: "facebook", icon: FaFacebook },
  { name: "twitter", icon: FaTwitter },
];
