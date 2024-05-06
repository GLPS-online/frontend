import { useModal } from "@/hooks/useModal";
import * as S from "../RowStyled";
import Nametag from "@/components/Nametag/Nametag";
import { createPortal } from "react-dom";
import EopApproveModal from "@/modals/EopApproveModal";
type Props = {
  eop: any;
  isExpanded?: boolean;
};

export default function EopRow({ eop, isExpanded = false }: Props) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const { student, approvedBy } = eop;
  const date = new Date(eop.createdAt);
  const approveDate = new Date(eop.updatedAt);

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const yoil = week[date.getDay()];

  return (
    <>
      {createPortal(
        isModalOpen && (
          <EopApproveModal id={eop._id} handleModalClose={handleModalClose} />
        ),
        document.body
      )}
      <S.RowContainer>
        <S.Cells>
          <S.Cell>{student.korName}</S.Cell>
          <S.Cell>{eop.isApproved ? "🆗" : "❌"}</S.Cell>
          <S.Cell
            style={{
              fontSize: "17px",
              fontWeight: "300",
            }}
          >
            {("0" + (date.getMonth() + 1)).slice(-2) +
              "/" +
              ("0" + date.getDate()).slice(-2) +
              " " +
              ("0" + date.getHours()).slice(-2) +
              ":" +
              ("0" + date.getMinutes()).slice(-2)}
          </S.Cell>
        </S.Cells>
        {isExpanded ? (
          <>
            <S.Cells>
              <S.Cell></S.Cell>
              <S.Cell>
                {eop.isApproved ? (
                  <Nametag data={approvedBy} forTimetable />
                ) : (
                  <button
                    style={{
                      width: "80px",
                      height: "25px",
                      padding: "5px",
                      fontSize: "15px",
                      fontWeight: "500",
                      border: "1px solid var(--lightgray)",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "var(--lightgray)",
                      color: "var(--darkblue)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalOpen();
                    }}
                  >
                    검사하기
                  </button>
                )}
              </S.Cell>
              <S.Cell
                style={{
                  fontSize: "17px",
                  fontWeight: "300",
                }}
              >
                {eop.isApproved
                  ? ("0" + (approveDate.getMonth() + 1)).slice(-2) +
                    "/" +
                    ("0" + approveDate.getDate()).slice(-2) +
                    " " +
                    ("0" + approveDate.getHours()).slice(-2) +
                    ":" +
                    ("0" + approveDate.getMinutes()).slice(-2)
                  : `(${yoil}요일)`}
              </S.Cell>
            </S.Cells>
            {/* {eop.isApproved || (
            <S.NoteArea>
              <span>
                {`"${eop.note}" - `}&nbsp;
                <Nametag data={user} forTimetable />
              </span>
            </S.NoteArea>
          )} */}
          </>
        ) : (
          <></>
        )}
      </S.RowContainer>
    </>
  );
}
