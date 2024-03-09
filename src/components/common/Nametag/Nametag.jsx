import { isMobile } from "react-device-detect";
import * as S from "./NametagStyled";

export default function Nametag({ wave, name, phone }) {
  function handleClick(e) {
    e.stopPropagation();
    if (isMobile) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard.writeText(phone);
    }
  }
  return (
    <S.Container onClick={handleClick}>
      <S.Name>{name} </S.Name>
      <S.Wave>{wave}</S.Wave>
    </S.Container>
  );
}
