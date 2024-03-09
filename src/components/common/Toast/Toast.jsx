import React from "react";
import * as S from "./ToastStyled";

const Toast = ({ shouldRender, isShown, message, startHidingToast }) => {
  return (
    shouldRender && (
      <S.ToastContainer $isShown={isShown}>
        <S.CompletedIcon />
        <S.Message>{message}</S.Message>
        <S.CloseIcon onClick={startHidingToast} />
      </S.ToastContainer>
    )
  );
};

export default Toast;
