import { useState } from "react";
import logo from "../assets/images/Orion_transparent-.png";
import { useNavigate, NavigateFunction } from "react-router";
import {
  handleLogin,
  handleThirdPartyLogin,
  providers,
  getEmail,
  getName,
  getToken,
} from "../services/auth.service";
import { TextField, Button } from "@mui/material";
import { inputStyles } from "../styles/mui";

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="my-3">
        <img src={logo} width={250} alt="Orion logo image" />
      </div>
      <div className="flex my-2 text-lg">
        <p className="text-white">Log into your account</p>
      </div>
      <div className="flex flex-col items-center space-y-4 my-3">
        <TextField
          id="outlined-basic"
          label="Email address"
          size="small"
          variant="outlined"
          className="w-[340px]"
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
          type="password"
          variant="outlined"
          className="w-[340px]"
          sx={inputStyles}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center my-2 mb-3 w-[340px] px-5">
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
        <div className="ml-auto">
          <a href="#" className="text-white hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="my-3">
        <Button
          variant="outlined"
          onClick={(e: any) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            try {
              handleLogin({
                email,
                password,
                rememberMe,
                loading,
                setLoading,
                setEmail,
                setPassword,
                setRememberMe,
                navigate,
              });
              console.log(getEmail(), getName(), getToken());
            } finally {
              setLoading(false);
            }
          }}
          type="submit"
          className="w-[340px] h-10"
          sx={{
            backgroundColor: "rgb(59, 113, 203)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(88, 142, 237)",
            },
          }}>
          Log in
        </Button>
      </div>
      <div className="my-3">
        <p className="text-white">
          Don't have an account?{" "}
          <a className="text-[rgb(88,142,237)]" href="/signup">
            Sign up
          </a>
        </p>
      </div>
      <div className="flex items-center w-[340px] text-white px-4">
        <hr className="flex-grow bg-white" />
        <p className="mx-2">Or log in with</p>
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

export default Login;
