import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer/Footer";
import Navbar from "./components/common/Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
