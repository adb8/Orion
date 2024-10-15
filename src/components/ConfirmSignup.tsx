import { useState } from "react";
import logo from "../assets/images/Orion_transparent-.png";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { handleSignupConfirm } from "../services/auth.service";
import { Button } from "@mui/material";
import VerificationInput from "react-verification-input";
import { useSearchParams } from "react-router-dom";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  console.log(searchParams.get("email"));
  console.log(email);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="my-3">
        <img src={logo} width={250} alt="Orion logo image" />
      </div>
      <div className="flex my-2 text-lg text-center">
        <p className="text-white">Verify your email address</p>
      </div>
      <div className="flex my-2 text-center">
        {email && (
          <p className="text-white text-base">
            Enter 6-digit verification code sent to:
            <br />
            {email}
          </p>
        )}
      </div>
      <div className="w-[320px] my-5">
        <VerificationInput
          value={code}
          onChange={(code) => setCode(code)}
          validChars="0-9"
          inputProps={{ inputMode: "numeric" }}
          classNames={{
            container: "container",
            character: "character",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
            characterFilled: "character--filled",
          }}
        />
      </div>
      <div className="mt-4">
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            handleSignupConfirm({ email, code, setCode, navigate });
            setLoading(false);
          }}
          type="submit"
          className="w-[320px] h-10"
          sx={{
            backgroundColor: "rgb(59, 113, 203)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(88, 142, 237)",
            },
          }}>
          Confirm email address
        </Button>
      </div>
    </div>
  );
};

export default Signup;
