import { useEffect, useState } from "react";
import Nametag from "../common/Nametag/Nametag";
import { searchPtla } from "../../api";
import * as S from "./TimetableItemStyled";
import Ptla from "../../interfaces/Ptla";
import { classInfo } from "../../interfaces/Timetable";

type Props = {
  elem: classInfo;
  selected: boolean;
  classPA: Ptla;
};

export default function TimetableItem({ elem, selected, classPA }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [subjectTA, setSubjectTA] = useState<Ptla | null>(null);

  async function handleFetch(params: { role?: string; area?: string }) {
    const res = await searchPtla(params);
    return res;
  }

  useEffect(() => {
    if (elem.subject === "PE" || elem.subject === "VQ") {
      setSubjectTA(classPA);
      return;
    }

    const area = elem.location;
    handleFetch({ area }).then((res) => setSubjectTA(res));
  }, [classPA, elem]);

  return (
    <S.Item $selected={selected} onClick={() => setIsFlipped((prev) => !prev)}>
      <S.Subject>{elem.subject}</S.Subject>
      {isFlipped ? (
        subjectTA ? (
          <Nametag data={subjectTA} forTimetable={true} />
        ) : (
          <S.TA>----</S.TA>
        )
      ) : (
        <S.Location>{elem.location === "-" ? "TBD" : elem.location}</S.Location>
      )}
    </S.Item>
  );
}
