import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { NavigateFunction } from "react-router-dom";
import { signIn, signUp, getCurrentUser, confirmSignUp, signOut } from "@aws-amplify/auth";

export const handleLogin = async ({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  navigate,
  auth,
  setAuthStatus,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  auth: string | null;
  setAuthStatus: any;
}) => {
  console.log(email, password, rememberMe);
  if (auth === "AUTHENTICATED") {
    return;
  }
  if (!email || !password) {
    const error = "All input fields are required";
    alert(error);
    setAuthStatus("UNAUTHENTICATED");
    return;
  }
  try {
    const { nextStep } = await signIn({
      username: email,
      password: password,
    });
    if (nextStep.signInStep === "DONE") {
      setAuthStatus("AUTHENTICATED");
      navigate("/");
      return;
    } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      setAuthStatus("UNAUTHENTICATED");
      navigate(`/auth/signup/confirm?email=${encodeURIComponent(email)}`);
      return;
    } else {
      console.log("nextStep", nextStep);
    }
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
  setEmail("");
  setPassword("");
  setRememberMe(false);
  setAuthStatus("UNAUTHENTICATED");
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
  auth,
  setAuthStatus,
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
  auth: string | null;
  setAuthStatus: any;
}) => {
  console.log(email, password, passwordConfirm, rememberMe);
  if (auth === "AUTHENTICATED") {
    return;
  }
  switch (true) {
    case !email || !password || !passwordConfirm:
      alert("All input fields are required");
      setAuthStatus("UNAUTHENTICATED");
      return;
    case password !== passwordConfirm:
      alert("Passwords do not match");
      setAuthStatus("UNAUTHENTICATED");
      return;
    case password.length < 6:
      alert("Password length must be greater than 8 characters");
      setAuthStatus("UNAUTHENTICATED");
      return;
    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      setAuthStatus("UNAUTHENTICATED");
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
    setAuthStatus("UNAUTHENTICATED");
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
  setAuthStatus("UNAUTHENTICATED");
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

export const handleSignout = async ({ navigate }: { navigate: NavigateFunction }) => {
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
