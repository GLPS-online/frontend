import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import AdminPage from "./pages/AdminPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
