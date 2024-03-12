import { getCurrentTimetableIndex } from "../../utils/time";
import * as S from "./TimetableStyled";

export default function Timetable({ table }) {
  const currentIndex = getCurrentTimetableIndex();
  console.log(currentIndex);
  if (!table || table.length !== 22) {
    return <div>insufficient timetable data</div>;
  }
  return (
    <S.TimetableContainer>
      {table?.map((elem, i) => (
        <S.TimetableItem key={i} $selected={currentIndex === i}>
          <S.Subject>{elem.subject}</S.Subject>
          <S.Location>{elem.location}</S.Location>
        </S.TimetableItem>
      ))}
    </S.TimetableContainer>
  );
}
