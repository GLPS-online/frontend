import { isMobile, isBrowser } from "react-device-detect";
import * as S from "./NametagStyled";
import Ptla from "@/interfaces/Ptla";
import useToast from "@/hooks/useToast";
import Toast from "../Toast/Toast";

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
  const { shouldRender, isShown, showToast, startHidingToast, message } =
    useToast();

  if (!data) {
    return <div></div>;
  }
  const { division, wave, korName, phone } = data;

  async function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    if (isMobile) {
      window.location.href = `tel:${phone}`;
    } else if (isBrowser) {
      try {
        await navigator.clipboard.writeText(phone);
        showToast("전화번호가 복사되었습니다!");
      } catch (error) {
        alert(error);
      }
    }
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
      {shouldRender && (
        <Toast
          shouldRender={shouldRender}
          isShown={isShown}
          message={message}
          startHidingToast={startHidingToast}
        />
      )}
    </>
  );
}
