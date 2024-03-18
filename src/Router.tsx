import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import StudentPage from "./pages/StudentPage/StudentPage";
import PtlaPage from "./pages/PtlaPage/PtlaPage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },

      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "timetables",
        element: <TimetablePage />,
      },
      {
        path: "student/:id",
        element: <StudentPage />,
      },
      {
        path: "ptla/:id",
        element: <PtlaPage />,
      },
    ],
  },
]);

const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default Router;
