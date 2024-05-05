import { isBirthday } from "@/utils/etc";
import * as S from "../RowStyled";
import Student from "@/interfaces/Student";
import ClubExpanded from "./ClubExpanded";

type Props = {
  student: Student;
  isExpanded?: boolean;
};

// const displayProps = ["korName", "className", "club"];

export default function ClubRow({ student, isExpanded = false }: Props) {
  return (
    <S.RowContainer $disabled={student.status === "absent"}>
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
        <S.Cell>{student["className"]}</S.Cell>
        <S.Cell>{student["club"]}</S.Cell>
      </S.Cells>
      {isExpanded && <ClubExpanded student={student} />}
    </S.RowContainer>
  );
}
