import * as S from "./RowStyled";
import StudentExpanded from "./StudentExpanded";

type Props = {
  student: any;
  selected: string;
  isExpanded?: boolean;
};

const displayProps = ["korName", "className", "roomNum"];

export default function StudentRow({
  student,
  selected,
  isExpanded = false,
}: Props) {
  return (
    <S.RowContainer $selected={selected}>
      <S.Cells>
        {displayProps.map((option: string, i: number) => (
          <S.Cell key={i}>{student[option]}</S.Cell>
        ))}
      </S.Cells>
      {isExpanded && <StudentExpanded student={student} />}
    </S.RowContainer>
  );
}
