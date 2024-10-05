import { useState } from "react";
import logo from "../assets/images/Orion_transparent-.png";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { completeSignup } from "../services/auth.service";
import { inputStyles } from "../styles/mui";
import { TextField, Button, MenuItem } from "@mui/material";
import { countryList } from "../assets/countryList";

const Signup = () => {
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [country, setCountry] = useState("");
  const [receiveMessages, setReceiveMessages] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="my-3">
        <img src={logo} width={250} alt="Orion logo image" />
      </div>
      <div className="flex my-2 text-lg">
        <p className="text-white">Complete account creation</p>
      </div>
      <div className="flex flex-col items-center space-y-4 my-3">
        <TextField
          id="outlined-basic"
          label="First name"
          size="small"
          variant="outlined"
          className="w-[350px]"
          sx={inputStyles}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 my-3 mt-1">
        <TextField
          id="outlined-basic"
          label="Last name"
          size="small"
          variant="outlined"
          type="password"
          className="w-[350px]"
          sx={inputStyles}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 my-3 mt-1">
        <TextField
          id="country-select"
          label="Country"
          select
          size="small"
          variant="outlined"
          className="w-[350px]"
          value={country}
          sx={inputStyles}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: "rgb(55, 55, 55)",
                  color: "white",
                  width: "350px",
                  "&::-webkit-scrollbar": {
                    width: "0px",
                    height: "0px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  boxShadow: "none",
                  borderRadius: "0px",
                },
              },
            },
          }}
          onChange={(e) => setCountry(e.target.value)}>
          {Object.entries(countryList).map(([code, name]) => (
            <MenuItem key={code} value={name} sx={{
              textAlign: "center",
              color: "white",
            }}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="flex flex-col items-center space-y-4 my-3 mt-1">
        <TextField
          id="outlined-basic"
          label="Age"
          type="tel"
          size="small"
          variant="outlined"
          className="w-[350px]"
          sx={inputStyles}
          value={age}
          onChange={(e) => {
            if (isNaN(Number(e.target.value))) return;
            if (Number(e.target.value) <= 0) {
              setAge(null);
              return;
            }
            if (Number(e.target.value) > 100) {
              return;
            }
            setAge(Number(e.target.value));
          }}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 my-3 mt-1">
        <TextField
          id="outlined-basic"
          label="Phone number"
          type="text"
          size="small"
          variant="outlined"
          className="w-[350px]"
          sx={inputStyles}
          value={phoneNumber}
          onChange={(e) => {
            const newValue = e.target.value;
            if (!/^\d*$/.test(newValue) || newValue.length > 10) return;
            setPhoneNumber(newValue);
          }}
        />
      </div>
      <div className="flex items-center my-2 w-[350px] px-3 justify-center">
        <div className="flex items-center space-x-2 mr-auto">
          <input
            type="checkbox"
            name="receiveMessages"
            id="receiveMessages"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={receiveMessages}
            onChange={(e) => setReceiveMessages(e.target.checked)}
          />
          <label htmlFor="receiveMessages" className="text-white">
            Receive SMS messages at this number
          </label>
        </div>
      </div>
      <div className="my-3">
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            try {
              completeSignup({
                navigate,
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
                receiveMessages,
                setReceiveMessages,
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
          Complete signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;
