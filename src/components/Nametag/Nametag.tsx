import { useModal } from "@/hooks/useModal";
import * as S from "./NametagStyled";
import User from "@/interfaces/User";
import { createPortal } from "react-dom";
import UserModal from "@/modals/UserModal";

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

  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  async function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    handleModalOpen();
  }
  if (!data) {
    return <div></div>;
  }
  return (
    <>
      {createPortal(
        isModalOpen && _id && (
          <UserModal id={_id} handleModalClose={handleModalClose} />
        ),
        document.body
      )}
      <S.Container $forTimetable={forTimetable} onClick={handleClick}>
        {displayDivision && (
          <S.Division $forTimetable={forTimetable}>{division}</S.Division>
        )}
        <S.Name $forTimetable={forTimetable}>{korName} </S.Name>
        {displayWave && <S.Wave $forTimetable={forTimetable}>{wave}</S.Wave>}
      </S.Container>
    </>
  );
}
