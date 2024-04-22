import { KeyboardEvent, ReactNode } from "react";
import * as S from "./ModalContainerStyled";

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

  return (
    <S.Background
      onKeyDown={escCloseModal}
      onClick={() => handleModalClose()}
      tabIndex={0}
    >
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        {children}
      </S.Container>
    </S.Background>
  );
}

export default ModalContainer;
