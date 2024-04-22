import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./Dropdown";
import * as S from "./NavbarStyled";

import arrowDownIcon from "@/assets/icons/arrowDown.svg";
import arrowUpIcon from "@/assets/icons/arrowUp.svg";

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
            src={isMenuOpen ? arrowUpIcon : arrowDownIcon}
            alt="togglemenu"
          />
          {isMenuOpen && <Dropdown />}
        </S.UserArea>
      </S.NavbarContainer>
    )
  );
}
