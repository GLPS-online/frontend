import * as S from "./ModalStyled";

type Props = {
  text: string;
  onButtonClick: () => void;
  onClose: () => void;
};

export default function Modal({ text, onButtonClick, onClose }: Props) {
  return (
    <>
      <S.ModalContainer>
        <S.ModalContents>
          <button onClick={() => console.log("close")}>
            <S.ModalCloser />
          </button>
          <S.ModalTitle>타이틀</S.ModalTitle>
          <S.ModalText>ㅇㅇㅁㄴㅇㄻㄴㄻㄴㅇㄻㄴㄻㄴㄹㄴㅇ</S.ModalText>
        </S.ModalContents>
      </S.ModalContainer>
    </>
  );
}
