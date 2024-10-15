import { handleSignout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          handleSignout({ navigate });
        }}>
        Log out
      </button>
    </div>
  );
};

export default Home;
