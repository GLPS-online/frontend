import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import StudentPage from "./pages/StudentPage/StudentPage";
import Layout from "./Layout";
import PtlaSearchPage from "./pages/PtlaSearchPage/PtlaSearchPage";
import PtlaPage from "./pages/PtlaPage/PtlaPage";

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
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "timetables/:className?",
        element: <TimetablePage />,
      },
      {
        path: "student/:id",
        element: <StudentPage />,
      },
      {
        path: "ptlas",
        element: <PtlaSearchPage />,
      },
      {
        path: "ptla/:id",
        element: <PtlaPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
]);

const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default Router;
