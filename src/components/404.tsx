import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const _404 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const absoluteUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;
  return (
    <div className="text-white text-lg w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center flex-col">
        <h1 className="text-4xl mb-4">404: Not Found</h1>
        <h1 className="mb-2">The requested resource wasn't found</h1>
        <h1 className="mb-6">{absoluteUrl} is not a valid URL</h1>
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            width: "200px",
          }}>
          Go back
        </Button>
      </div>
    </div>
  );
};

export default _404;
