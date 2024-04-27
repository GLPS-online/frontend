import { KeyboardEvent, ReactNode, useEffect } from "react";
import * as S from "./ModalContainerStyled";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
interface Props {
  children: ReactNode;
  title: string;
  handleModalClose: () => void;
}

function ModalContainer({ children, title, handleModalClose }: Props) {
  const escCloseModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleModalClose();
    } else {
      return;
    }
  };
  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    disableBodyScroll(body);
    return () => {
      enableBodyScroll(body);
    };
  }, []);

  return (
    <S.Background onKeyDown={escCloseModal} tabIndex={0} id="modal">
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        {children}
      </S.Container>
    </S.Background>
  );
}

export default ModalContainer;
