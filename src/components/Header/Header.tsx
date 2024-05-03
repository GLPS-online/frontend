import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Dropdown from "./Dropdown";
import * as S from "./HeaderStyled";

export default function Header() {
  const toggleRef = useRef<HTMLDivElement>(null);
  const { getUser } = useAuth();
  const user = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

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
        <S.LogoContainer title="홈으로 이동" onClick={() => navigate("/")}>
          <S.BigText>GLPS</S.BigText>
          <S.SmallText>online</S.SmallText>
        </S.LogoContainer>
        <S.UserArea
          onClick={() => setIsMenuOpen((prev) => !prev)}
          ref={toggleRef}
        >
          {user ? (
            <S.Profile>
              {user.korName}
              {user.division}
            </S.Profile>
          ) : (
            <button onClick={() => navigate("/login")}>로그인</button>
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
