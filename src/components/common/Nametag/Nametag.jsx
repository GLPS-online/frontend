import { isMobile, isBrowser } from "react-device-detect";
import * as S from "./NametagStyled";
import Toast from "../Toast/Toast";
import useToast from "../../../hooks/useToast";
import { useState } from "react";

export default function Nametag({ division, wave, name, phone }) {
  const [isHovered, setIsHovered] = useState(false);

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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <S.Container onClick={handleClick}>
          {isHovered ? (
            <S.Phone>{phone}</S.Phone>
          ) : (
            <>
              <S.Division>{division}</S.Division>
              <S.Name>{name} </S.Name>
              <S.Wave>{wave}</S.Wave>
            </>
          )}
        </S.Container>
      </div>
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
