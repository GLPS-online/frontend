import { KeyboardEvent, ReactNode, useEffect } from "react";
import * as S from "./ModalContainerStyled";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

interface Props {
  children: ReactNode;
  title: string;
  handleModalClose: () => void;
  isScrollable?: boolean;
}

function ModalContainer({
  children,
  title,
  handleModalClose,
  isScrollable = false,
}: Props) {
  const escCloseModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleModalClose();
    } else {
      return;
    }
  };
  useEffect(() => {
    if (!isScrollable) {
      disableBodyScroll(document.body, {
        // @ts-ignore
        allowTouchMove: (el) => {
          while (el && el !== document.body) {
            if (el.id === "lock") {
              return true;
            }
            // @ts-ignore
            el = el.parentElement;
          }
        },
      });
    }
    document.body.style.overflow = "hidden";
    return () => {
      clearAllBodyScrollLocks();
      document.body.style.removeProperty("overflow");
    };
  }, [isScrollable]);

  return (
    <S.Background
      onKeyDown={escCloseModal}
      onClick={(e) => e.stopPropagation()}
      tabIndex={0}
      id="modal"
    >
      <S.Container id="lock" onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        {children}
      </S.Container>
    </S.Background>
  );
}

export default ModalContainer;
