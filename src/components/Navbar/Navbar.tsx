import { Link } from "react-router-dom";
import * as S from "./NavbarStyled";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <S.NavbarContainer>
      <Link to="/">로고</Link>

      {user ? (
        <div>
          안녕하세요 {user?.korName}님
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link to="/login">로그인버튼</Link>
      )}
    </S.NavbarContainer>
  );
}
