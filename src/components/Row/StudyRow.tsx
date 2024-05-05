import * as S from "./RowStyled";
type Props = {
  shuttle: any;
  isExpanded?: boolean;
};

// const displayProps = ["student.korName", "departure", "destination"];

export default function ShuttleRow({ shuttle, isExpanded = false }: Props) {
  return (
    <S.RowContainer>
      <S.Cells>
        <S.Cell>{shuttle.student.korName}</S.Cell>
        <S.Cell>{shuttle.departure}</S.Cell>
        <S.Cell>{shuttle.destination}</S.Cell>
      </S.Cells>
    </S.RowContainer>
  );
}
