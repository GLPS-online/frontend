import * as S from "./TimetableStyled";

export default function Timetable({ table }) {
  return (
    <S.TimetableContainer>
      {table?.map((elem, i) => (
        <S.TimetableItem key={i}>
          <S.Subject>{elem.subject}</S.Subject>
          <S.Location>{elem.location}</S.Location>
        </S.TimetableItem>
      ))}
    </S.TimetableContainer>
  );
}
