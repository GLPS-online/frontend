import { useEffect, useState } from "react";
import Ptla from "@/interfaces/Ptla";
import { classInfo } from "@/interfaces/Timetable";
import useAutoReload from "@/hooks/useAutoReload";
import { getCurrentTimetableIndex } from "@/utils/time";
import TimetableItem from "./TimetableItem";
import * as S from "./TimetableStyled";

type Props = {
  table: classInfo[];
  classPA: Ptla | null;
};

export default function Timetable({ table, classPA }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  function getTimetableIndex() {
    const newIndex: number | null = getCurrentTimetableIndex();
    setCurrentIndex(newIndex);
  }

  useEffect(() => getTimetableIndex(), []);
  useAutoReload(getTimetableIndex);

  if (!table || table.length !== 22) {
    return <div>insufficient timetable data</div>;
  }
  return (
    <S.Container>
      {table?.map((elem, i) => (
        <TimetableItem
          key={(classPA?._id || Math.random().toString(36).substring(2, 5)) + i}
          elem={elem}
          selected={currentIndex === i}
          classPA={classPA}
        />
      ))}
    </S.Container>
  );
}
