import { useEffect, useState } from "react";
import User from "@/interfaces/User";
import { searchUser } from "@/api/userApi";
import { classInfo } from "@/interfaces/Timetable";
import Nametag from "@/components/Nametag/Nametag";
import * as S from "./TimetableItemStyled";

type Props = {
  elem: classInfo;
  selected: boolean;
  classPA: User | null;
};

export default function TimetableItem({ elem, selected, classPA }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [subjectTA, setSubjectTA] = useState<User | null>(null);

  async function handleFetch(params: { position?: string; area?: string }) {
    const res = await searchUser(params);
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
          <Nametag
            data={subjectTA}
            displayDivision={false}
            forTimetable={true}
          />
        ) : (
          <S.TA>----</S.TA>
        )
      ) : (
        <S.Location>{elem.location === "-" ? "TBD" : elem.location}</S.Location>
      )}
    </S.Item>
  );
}
