import { useState } from "react";
import logo from "../assets/images/Orion_transparent-.png";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
  handleSignup,
  handleThirdPartyLogin,
  providers,
} from "../services/auth.service";
import { inputStyles } from "../styles/mui";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const { auth, setAuthStatus } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="my-3">
        <img src={logo} width={250} alt="Orion logo image" />
      </div>
      <div className="flex my-2 text-lg">
        <p className="text-white">Create new account</p>
      </div>
      <div className="flex flex-col items-center space-y-4 my-3">
        <TextField
          id="outlined-basic"
          label="Email address"
          size="small"
          variant="outlined"
          className="w-[350px]"
          sx={inputStyles}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 my-3 mt-1">
        <TextField
          id="outlined-basic"
          label="Password"
          size="small"
          variant="outlined"
          type="password"
          className="w-[350px]"
          sx={inputStyles}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 my-3 mt-1">
        <TextField
          id="outlined-basic"
          label="Confirm password"
          type="password"
          size="small"
          variant="outlined"
          className="w-[350px]"
          sx={inputStyles}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="flex items-center my-2 w-[350px] px-5 justify-center">
        <div className="flex items-center space-x-2 mr-auto">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-white">
            Remember me
          </label>
        </div>
      </div>
      <div className="my-3">
        <Button
          onClick={(e) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            try {
              handleSignup({
                auth,
                setAuthStatus,
                email,
                password,
                passwordConfirm,
                rememberMe,
                setEmail,
                setPassword,
                setPasswordConfirm,
                setRememberMe,
                navigate,
              });
            } finally {
              setLoading(false);
            }
          }}
          type="submit"
          className="w-[350px] h-10"
          sx={{
            backgroundColor: "rgb(59, 113, 203)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(88, 142, 237)",
            },
          }}>
          Sign up
        </Button>
      </div>
      <div className="my-3">
        <p className="text-white">
          Already have an account?{" "}
          <a className="text-[rgb(88,142,237)]" href="/auth/login">
            Log in
          </a>
        </p>
      </div>
      <div className="flex items-center w-[350px] text-white px-2">
        <hr className="flex-grow bg-white" />
        <p className="mx-2">Or sign up with</p>
        <hr className="flex-grow bg-white" />
      </div>
      <div className="flex space-x-5 my-3">
        {providers.map(({ name, icon: Icon }) => (
          <Icon
            key={name}
            className="text-gray-300 text-2xl cursor-pointer"
            onClick={() => {
              handleThirdPartyLogin({
                provider: name,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Signup;
