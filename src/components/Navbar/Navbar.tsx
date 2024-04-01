import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./Dropdown";
import * as S from "./NavbarStyled";

export default function Navbar() {
  const { getUser } = useAuth();
  const user = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <S.NavbarContainer>
      <Link to="/">로고</Link>

      {user ? (
        <div onClick={() => setIsMenuOpen((prev) => !prev)}>
          Welcome, {user?.korName}
          {user?.division}님{" "}
          {isMenuOpen ? <S.ArrowUpButton /> : <S.ArrowDownButton />}
          {isMenuOpen && <Dropdown />}
        </div>
      ) : (
        <Link to="/login">로그인</Link>
      )}
    </S.NavbarContainer>
  );
}
