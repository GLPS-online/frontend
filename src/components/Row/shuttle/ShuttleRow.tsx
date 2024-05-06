import { deleteShuttle } from "@/api/actionApi";
import * as S from "../RowStyled";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  shuttle: any;
  isExpanded?: boolean;
};

export default function ShuttleRow({ shuttle, isExpanded = false }: Props) {
  const queryClient = useQueryClient();

  async function handleDelete() {
    const toastId = toast.loading("취소 중...");
    try {
      await deleteShuttle(shuttle._id);
      await queryClient.invalidateQueries({ queryKey: ["shuttles"] });
      toast.update(toastId, {
        render: "취소 완료👌",
        type: "success",
        autoClose: 2500,
        isLoading: false,
      });
    } catch (err: any) {
      toast.update(toastId, {
        render: "제출자 본인만 취소 가능합니다.",
        type: "error",
        autoClose: 2500,
        isLoading: false,
      });
    }
  }
  return (
    <S.RowContainer>
      <S.Cells>
        <S.Cell>{shuttle.student.korName}</S.Cell>
        <S.Cell>{shuttle.departure}</S.Cell>
        <S.Cell>{shuttle.destination}</S.Cell>
      </S.Cells>
      {isExpanded && (
        <S.Cells>
          <S.Cell>{/* {shuttle.time} */}</S.Cell>
          <S.Cell>{/* <Nametag data={shuttle.user} /> */}</S.Cell>
          <S.Cell>
            <span
              style={{
                color: "var(--darkblue)",
                textDecoration: "underline",
                fontSize: "17px",
                cursor: "pointer",
                alignSelf: "flex-end",
              }}
              onClick={handleDelete}
            >
              취소하기
            </span>
          </S.Cell>
        </S.Cells>
      )}
    </S.RowContainer>
  );
}
