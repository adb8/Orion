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
import ConfirmSignup from "../components/ConfirmSignup";
import _404 from "../components/404";
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
        <Route path="signup">
          <Route index element={<Signup />} loader={async () => await handleUnprotected()} />
          <Route path="complete">
            <Route
              index
              element={<CompleteSignup />}
              loader={async () => await handleProtected()}
            />
            <Route
              path="confirm"
              element={<ConfirmSignup />}
              loader={async () => await handleProtected()}
            />
          </Route>
          <Route
            path="confirm"
            element={<ConfirmSignup />}
            loader={async () => await handleUnprotected()}
          />
        </Route>
      </Route>
      <Route path="*" element={<_404/>} />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
