import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./Dropdown";
import * as S from "./HeaderStyled";

export default function Header() {
  const toggleRef = useRef<HTMLDivElement>(null);
  const { getUser } = useAuth();
  const user = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
          {user ? (
            <>
              {" "}
              {user.korName}
              {user.division}
            </>
          ) : (
            <Link to={"/login"}>로그인</Link>
          )}
          <S.menuOpen
            src={isMenuOpen ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg"}
            alt="togglemenu"
            draggable={false}
          />
          {isMenuOpen && <Dropdown />}
        </S.UserArea>
      </S.NavbarContainer>
    )
  );
}
