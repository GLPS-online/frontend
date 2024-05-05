import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import Layout from "./Layout";
import UserSearchPage from "./pages/UserSearchPage/UserSearchPage";
import ClubPage from "./pages/ClubPage/ClubPage";
import ShuttlePage from "./pages/ShuttlePage/ShuttlePage";
import StudyPage from "./pages/StudyPage/StudyPage";
import CardsPage from "./pages/CardsPage/CardsPage";
import EopPage from "./pages/EopPage/EopPage";

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
        path: "users",
        element: <UserSearchPage />,
      },
      {
        path: "clubs/:clubName?",
        element: <ClubPage />,
      },
      {
        path: "eop",
        element: <EopPage />,
      },
      {
        path: "cards",
        element: <CardsPage />,
      },
      {
        path: "shuttle",
        element: <ShuttlePage />,
      },
      {
        path: "study",
        element: <StudyPage />,
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
