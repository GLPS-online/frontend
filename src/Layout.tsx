import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginRedirector from "./LoginRedirector";

function Layout() {
  return (
    <>
      <LoginRedirector>
        <Header />
        <Outlet />
        <Footer />
      </LoginRedirector>
    </>
  );
}

export default Layout;
