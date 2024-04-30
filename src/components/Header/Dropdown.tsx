import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import * as S from "./DropdownStyled";

export default function Dropdown() {
  const { getUser, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <S.DropDownContianer>
      <S.DropDownItem onClick={() => {}}>관리보드</S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          navigate("/users");
        }}
      >
        P·T·LA 검색
      </S.DropDownItem>
      <S.DropDownItem disabled onClick={() => {}}>식단표</S.DropDownItem>
      <S.DropDownItem onClick={() => {navigate("/club")}}>동아리/종교활동</S.DropDownItem>
      <S.DropDownItem disabled onClick={() => {}}>VQ 장소신청</S.DropDownItem>
      <S.DropDownItem disabled onClick={() => {}}>카드현황</S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          // const slug = user?.position.includes("class") 어쩌고 저쩌고
          const slug = "";
          navigate(`/timetables/${slug}`);
        }}
      >
        시간표
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          navigate(`/user/${getUser()?._id}`);
        }}
      >
        내 정보/수정
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
