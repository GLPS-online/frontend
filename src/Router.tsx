import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import StudentPage from "./pages/StudentPage/StudentPage";
import Layout from "./Layout";
import UserSearchPage from "./pages/UserSearchPage/UserSearchPage";
import UserPage from "./pages/UserPage/UserPage";
import ClubPage from "./pages/ClubPage/ClubPage";
import BoardPage from "./pages/BoardPage/BoardPage";

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
        path: "users",
        element: <UserSearchPage />,
      },
      {
        path: "user/:id",
        element: <UserPage />,
      },
      {
        path: "clubs/:clubName?",
        element: <ClubPage />,
      },
      {
        path: "board",
        element: <BoardPage />,
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
