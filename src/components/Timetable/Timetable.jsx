import * as S from "./TimetableStyled";

export default function Timetable({ data }) {
  return (
    <S.TimetableContainer>
      {data?.table &&
        data.table.map((elem, i) => (
          <S.TimetableItem key={i}>
            {elem.subject}
            <br />
            {elem.location}
          </S.TimetableItem>
        ))}
    </S.TimetableContainer>
  );
}
