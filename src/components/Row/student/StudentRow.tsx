import { isBirthday } from "@/utils/etc";
import * as S from "../RowStyled";
import StudentExpanded from "./StudentExpanded";
import Student from "@/interfaces/Student";

type Props = {
  student: Student;
  selected: string;
  isExpanded?: boolean;
};

// const displayProps = ["korName", "className", "roomNum"];

export default function StudentRow({
  student,
  selected,
  isExpanded = false,
}: Props) {
  return (
    <S.RowContainer
      $selected={selected}
      $disabled={student.status === "absent"}
    >
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
        <S.Cell>{student["roomNum"]}</S.Cell>
      </S.Cells>
      {isExpanded && <StudentExpanded student={student} />}
    </S.RowContainer>
  );
}
