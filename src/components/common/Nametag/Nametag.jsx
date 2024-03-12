import { isMobile, isBrowser } from "react-device-detect";
import * as S from "./NametagStyled";
import Toast from "../Toast/Toast";
import useToast from "../../../hooks/useToast";

export default function Nametag({
  data,
  displayDivision = true,
  forTimetable = false,
}) {
  const { division, wave, korName, phone } = data || {};
  const { shouldRender, isShown, showToast, startHidingToast, message } =
    useToast();

  async function handleClick(e) {
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
