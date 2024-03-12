import { getCurrentTimetableIndex } from "../../utils/time";
import TimetableItem from "./TimetableItem";
import * as S from "./TimetableStyled";

export default function Timetable({ table, classPA }) {
  const currentIndex = getCurrentTimetableIndex();
  if (!table || table.length !== 22) {
    return <div>insufficient timetable data</div>;
  }
  return (
    <S.Container>
      {table?.map((elem, i) => (
        <TimetableItem
          key={classPA._id + i}
          elem={elem}
          selected={currentIndex === i}
          classPA={classPA}
        />
      ))}
    </S.Container>
  );
}
