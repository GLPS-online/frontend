import User from "@/interfaces/User";
import * as S from "../ExpandedStyled";
import { createPortal } from "react-dom";
import UserModal from "@/modals/UserModal";
import { useModal } from "@/hooks/useModal";

export default function UserExpanded({ user }: { user: User }) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <>
      {createPortal(
        isModalOpen && (
          <UserModal id={user._id} handleModalClose={handleModalClose} />
        ),
        document.body
      )}
      <S.Container>
        <S.Links>
          <S.Link
            onClick={(e) => {
              e.stopPropagation();
              handleModalOpen();
            }}
          >
            세부정보/수정
          </S.Link>
        </S.Links>
      </S.Container>
    </>
  );
}
