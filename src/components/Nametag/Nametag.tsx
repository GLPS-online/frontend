import * as S from "./NametagStyled";
import User from "@/interfaces/User";
import { useNavigate } from "react-router-dom";

type Props = {
  data: User | null;
  displayWave?: boolean;
  displayDivision?: boolean;
  forTimetable?: boolean;
};

export default function Nametag({
  data,
  displayDivision = true,
  displayWave = true,
  forTimetable = false,
}: Props) {
  const { _id, division, wave, korName } = data || {};
  const navigate = useNavigate();

  async function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    navigate(`/user/${_id}`);
  }
  if (!data) {
    return <div></div>;
  }
  return (
    <>
      <S.Container $forTimetable={forTimetable} onClick={handleClick}>
        {displayDivision && (
          <S.Division $forTimetable={forTimetable}>{division}</S.Division>
        )}
        <S.Name $forTimetable={forTimetable}>{korName} </S.Name>
        {displayWave && (
          <S.Wave $forTimetable={forTimetable}>{wave}</S.Wave>
        )}
      </S.Container>
    </>
  );
}
