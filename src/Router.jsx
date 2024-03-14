import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import StudentPage from "./pages/StudentPage/StudentPage.jsx";
import PtlaPage from "./pages/PtlaPage/PtlaPage.jsx";
import Layout from "./Layout.jsx";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="timetables" element={<TimetablePage />} />
        <Route path="student/:id" element={<StudentPage />} />
        <Route path="ptla/:id" element={<PtlaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
