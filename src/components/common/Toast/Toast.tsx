import * as S from "./ToastStyled";

type Props = {
  shouldRender: boolean;
  isShown: boolean;
  message: string;
  startHidingToast: () => void;
};

const Toast = ({ shouldRender, isShown, message, startHidingToast }: Props) => {
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
