import Ptla from "@/interfaces/Ptla";
import * as S from "./PtlaPageStyled";

export default function OtherInfo({ Ptla }: { Ptla: Ptla }) {
  return (
    <S.InfoContainer>
      <div>국문이름: {Ptla.korName}</div>
      <div>영문이름: {Ptla.engName}</div>
      <div>기수: {Ptla.wave}</div>
      <div>성별: {Ptla.gender}</div>
      <div>연락처: {Ptla.phone}</div>
    </S.InfoContainer>
  );
}
