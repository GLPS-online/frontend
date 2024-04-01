import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import * as S from "./DropdownStyled";

export default function Dropdown() {
  const { getUser, logout } = useAuth();
  const user = getUser();
  const navigate = useNavigate();
  return (
    <S.DropDownContianer>
      <S.DropDownItem
        onClick={() => {
          navigate(`/ptla/${user?._id}`);
        }}
      >
        내 정보 / 수정
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        로그아웃
      </S.DropDownItem>
    </S.DropDownContianer>
  );
}
