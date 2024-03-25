import { Link } from "react-router-dom";
import * as S from "./NavbarStyled";

export default function Navbar() {
  return (
    <S.NavbarContainer>
      <Link to="/">로고</Link>
      <Link to="/login">로그인버튼</Link>
    </S.NavbarContainer>
  );
}
