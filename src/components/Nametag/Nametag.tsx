import * as S from "./NametagStyled";
import Ptla from "@/interfaces/Ptla";
import { useNavigate } from "react-router-dom";

type Props = {
  data: Ptla | null;
  displayDivision?: boolean;
  forTimetable?: boolean;
};

export default function Nametag({
  data,
  displayDivision = true,
  forTimetable = false,
}: Props) {
  const { _id, division, wave, korName } = data || {};
  const navigate = useNavigate();

  async function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    navigate(`/ptla/${_id}`);
  }
  if (!data) {
    return <div></div>;
  }
  return (
    <>
      <S.Container onClick={handleClick}>
        {displayDivision && (
          <S.Division $forTimetable={forTimetable}>{division}</S.Division>
        )}
        <S.Name $forTimetable={forTimetable}>{korName} </S.Name>
        <S.Wave $forTimetable={forTimetable}>{wave}</S.Wave>
      </S.Container>
    </>
  );
}
