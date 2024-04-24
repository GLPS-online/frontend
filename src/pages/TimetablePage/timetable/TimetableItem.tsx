import { useState } from "react";
import User from "@/interfaces/User";
import { searchUser } from "@/api/userApi";
import { classInfo } from "@/interfaces/Timetable";
import Nametag from "@/components/Nametag/Nametag";
import * as S from "./TimetableItemStyled";
import { useQuery } from "@tanstack/react-query";

type Props = {
  elem: classInfo;
  selected: boolean;
  classPA: User | null;
};

export default function TimetableItem({ elem, selected, classPA }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const { data: subjectTA } = useQuery<User | null>({
    queryKey: ["subjectTA", elem.location],
    queryFn:
      elem.subject === "PE" || elem.subject === "VQ"
        ? () => classPA
        : () => searchUser({ area: elem.location }),
    initialData: null,
  });

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
        <S.Location>
          {elem.location === "-" ? "TBD" : elem.location.replace(" | ", "\n")}
        </S.Location>
      )}
    </S.Item>
  );
}
