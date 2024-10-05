import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import CompleteSignup from "../components/CompleteSignup";
import Protected from "./protected";
import { handleProtected, handleUnprotected } from "./helpers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Protected />}>
        <Route index element={<Home />} loader={async () => await handleProtected()} />
      </Route>
      <Route path="auth">
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} loader={async () => await handleUnprotected()} />
        <Route path="signup" element={<Signup />} loader={async () => await handleUnprotected()} />
        <Route
          path="complete"
          element={<CompleteSignup />}
          loader={async () => await handleProtected()}
        />
      </Route>
      <Route path="*" element={<h1>404: Resource not found</h1>} />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
