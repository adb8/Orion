import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { NavigateFunction } from "react-router-dom";
import {
  signIn,
  signUp,
  getCurrentUser,
  confirmSignUp,
  signOut,
  updateUserAttributes,
} from "@aws-amplify/auth";

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
    const { nextStep } = await signIn({
      username: email,
      password: password,
    });
    console.log(nextStep.signInStep);
    if (nextStep.signInStep === "DONE") {
      navigate("/");
      return;
    } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      navigate(`/auth/signup/confirm?email=${encodeURIComponent(email)}`);
      return;
    }
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
    console.log(
      "isSignUpComplete",
      isSignUpComplete,
      "userId",
      userId,
      "nextStep",
      nextStep.signUpStep
    );
    if (nextStep.signUpStep === "DONE" || isSignUpComplete) {
      navigate("/");
      return;
    } else if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      navigate(`/auth/signup/confirm?email=${encodeURIComponent(email)}`);
      return;
    }
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
  setEmail("");
  setPassword("");
  setPasswordConfirm("");
  setRememberMe(false);
};

export const handleSignupConfirm = async ({
  email,
  code,
  setCode,
  navigate,
}: {
  email: string | null;
  code: string | null;
  navigate: NavigateFunction;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log(email, code);
  if (!email || !code) {
    alert("All input fields are required");
    return;
  }
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    if (isSignUpComplete) {
      navigate("/auth/login");
      return;
    }
    console.log(nextStep.signUpStep);
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
  setCode("");
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
    const response = await updateUserAttributes({
      userAttributes: {
        given_name: firstName,
        family_name: lastName,
      },
    });
    console.log(response);
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
  navigate("/");
  setFirstName("");
  setLastName("");
  setPhoneNumber("");
  setAge(-1);
  setCountry("");
  setGender("");
  setReceiveMessages(false);
};

export const handleSignout = async ({ navigate }: { navigate: NavigateFunction }) => {
  const auth = await isAuthenticated();
  if (!auth) {
    navigate("/auth/login");
    return;
  }
  try {
    await signOut();
    navigate("/auth/login");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
};

export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser();
    console.log("user", user);
    if (user) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const handleThirdPartyLogin = async ({ provider }: { provider: string }) => {
  return alert(`To be implemented: ${provider}`);
};

export const providers = [
  { name: "google", icon: FaGoogle },
  { name: "facebook", icon: FaFacebook },
  { name: "twitter", icon: FaTwitter },
];
