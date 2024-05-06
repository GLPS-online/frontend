import * as S from "../RowStyled";
import Nametag from "@/components/Nametag/Nametag";
type Props = {
  card: any;
  isExpanded?: boolean;
};

// const displayProps = ["korName", "className", "roomNum"];

export default function CardRow({ card, isExpanded = false }: Props) {
  const { student, user } = card;
  const date = new Date(card.createdAt);

  return (
    <S.RowContainer>
      <S.Cells>
        <S.Cell>{student.korName}</S.Cell>
        <S.Cell>
          {(() => {
            switch (card.type) {
              case "green":
                return "🟩";
              case "yellow":
                return "🟨";
              case "red":
                return "🟥";
              default:
                return "🟪";
            }
          })()}
        </S.Cell>
        <S.Cell
          style={{
            fontSize: "17px",
            fontWeight: "300",
          }}
        >
          {("0" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            ("0" + date.getDate()).slice(-2) +
            " " +
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2)}
        </S.Cell>
      </S.Cells>
      {isExpanded && (
        <S.NoteArea>
          <span>
            {`"${card.note}" - `}&nbsp;
            <Nametag data={user} forTimetable />
          </span>
        </S.NoteArea>
      )}
    </S.RowContainer>
  );
}
