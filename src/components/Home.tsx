import { logout } from "../services/auth.service";
import { useNavigate, NavigateFunction } from "react-router-dom";

const Home = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          logout({
            navigate,
          });
        }}>
        Log out
      </button>
    </div>
  );
};

export default Home;
