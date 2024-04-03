import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./Dropdown";
import * as S from "./NavbarStyled";

export default function Navbar() {
  const toggleRef = useRef<HTMLDivElement>(null);
  const { getUser } = useAuth();
  const user = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //back drop component
  //redux

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    user && (
      <S.NavbarContainer>
        <Link to="/">로고</Link>
        <S.UserArea
          onClick={() => setIsMenuOpen((prev) => !prev)}
          ref={toggleRef}
        >
          Welcome, {user?.korName}
          {user?.division}님{" "}
          {isMenuOpen ? <S.ArrowUpButton /> : <S.ArrowDownButton />}
          {isMenuOpen && <Dropdown />}
        </S.UserArea>
      </S.NavbarContainer>
    )
  );
}
