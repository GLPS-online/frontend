import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">로고</Link>
      <Link to="/login">로그인버튼</Link>
    </div>
  );
}
