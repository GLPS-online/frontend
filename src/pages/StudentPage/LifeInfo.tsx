import Student from "../../interfaces/Student";
import * as S from "./StudentPageStyled";

export default function LifeInfo({ student }: { student: Student }) {
  return (
    <S.InfoContainer>
      <div>생활 관련 기록</div>
      <div>EOP 위반: 4회</div>
      <div>그린카드: 10개 - 펼치기</div>
      <div>옐로카드: 5개 - 펼치기</div>
      <div>레드카드: 1개 - 펼치기</div>
      <div>상담기록 -펼치기</div>
    </S.InfoContainer>
  );
}
