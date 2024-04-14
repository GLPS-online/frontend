import Student from "@/interfaces/Student";
import * as S from "./StudentPageStyled";

export default function LifeInfo({ student }: { student: Student }) {
  return (
    <S.InfoContainer>
      <div>상담 기록</div>
      <div>-- 삭제예정 --</div>
    </S.InfoContainer>
  );
}
