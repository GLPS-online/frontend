import Student from "@/interfaces/Student";
import { isBirthday } from "@/utils/etc";
import * as S from "../RowStyled";
import AdmissionExpanded from "./AdmissionExpanded";

type Props = {
  student: Student;
  isExpanded?: boolean;
};
export default function AdmissionRow({ student, isExpanded = false }: Props) {
  return (
    <S.RowContainer $disabled={student.status === "active"}>
      <S.Cells>
        <S.Cell>
          <>
            {isBirthday(student.birthDate) ? (
              <S.Cake>&nbsp;&nbsp;</S.Cake>
            ) : (
              <></>
            )}
            {student["korName"]}
            {isBirthday(student.birthDate) ? <S.Cake>🎂</S.Cake> : <></>}
          </>
        </S.Cell>
        <S.Cell>{student["school"] + " " + student["grade"]}</S.Cell>
        <S.Cell>{student["roomNum"]}</S.Cell>
      </S.Cells>
      {isExpanded && <AdmissionExpanded student={student} />}
    </S.RowContainer>
  );
}
