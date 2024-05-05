import Nametag from "../Nametag/Nametag";
import * as S from "./RowStyled";

type Props = {
  shuttle: any;
  isExpanded?: boolean;
};

export default function ShuttleRow({ shuttle, isExpanded = false }: Props) {
  return (
    <S.RowContainer>
      <S.Cells>
        <S.Cell>{shuttle.student.korName}</S.Cell>
        <S.Cell>{shuttle.departure}</S.Cell>
        <S.Cell>{shuttle.destination}</S.Cell>
      </S.Cells>
      <S.Cells style={{ marginTop: "5px" }}>
        <S.Cell style={{ fontWeight: "600" }}>{shuttle.time}</S.Cell>
        <S.Cell>
          <Nametag data={shuttle.user} />
        </S.Cell>
        <S.Cell
          style={{
            color: "var(--darkblue)",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {}}
        >
          취소하기
        </S.Cell>
      </S.Cells>
    </S.RowContainer>
  );
}
