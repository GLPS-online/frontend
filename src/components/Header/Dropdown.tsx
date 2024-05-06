import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import * as S from "./DropdownStyled";

export default function Dropdown() {
  const { getUser, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <S.DropDownContianer>
      <S.DropDownItem
        onClick={() => {
          navigate("/users");
        }}
      >
        사용자 검색
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          navigate("/clubs");
        }}
      >
        동아리/종교활동
      </S.DropDownItem>
      {/* <S.DropDownItem disabled onClick={() => {}}>
        VQ 장소신청
      </S.DropDownItem> */}
      <S.DropDownItem
        onClick={() => {
          navigate("/eop");
        }}
      >
        EOP 검사
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          navigate("/cards");
        }}
      >
        카드 발급현황
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          navigate("/study");
        }}
      >
        2자습 신청현황
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          navigate("/shuttle");
        }}
      >
        목발셔틀
      </S.DropDownItem>
      <S.DropDownItem
        onClick={() => {
          // const slug = user?.position.includes("class") 어쩌고 저쩌고
          const slug = "";
          navigate(`/timetables/${slug}`);
        }}
      >
        수업 시간표
      </S.DropDownItem>

      <S.DropDownItem disabled onClick={() => {}}>
        식단표
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
