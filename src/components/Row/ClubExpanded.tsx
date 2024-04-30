import * as S from "./ExpandedStyled";
import Student from "@/interfaces/Student";

export default function ClubExpanded({ student }: { student: Student }) {
  return (
    <S.Container>
      <S.Cells>
        <S.Cell>1지망: {student.clubChoice1}</S.Cell>
        <S.Cell>2지망: {student.clubChoice2}</S.Cell>
        <S.Cell>3지망: {student.clubChoice3}</S.Cell>
      </S.Cells>
    </S.Container>
  );
}
