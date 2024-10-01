import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Protected from "./protected";
import { isAuthenticated, handleProtected } from "./helpers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Protected />}>
        <Route index element={<Home />} loader={async () => await handleProtected()} />
      </Route>
      <Route path="login" element={<Login />} loader={async () => await isAuthenticated()} />
      <Route path="signup" element={<Signup />} loader={async () => await isAuthenticated()} />
      <Route path="*" element={<h1>404: Page not found</h1>} />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
