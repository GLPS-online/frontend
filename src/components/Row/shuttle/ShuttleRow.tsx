import { deleteShuttle } from "@/api/actionApi";
import Nametag from "../../Nametag/Nametag";
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
        render: "신청자 본인만 취소 가능합니다.",
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
      <S.Cells style={{ marginTop: "5px" }}>
        <S.Cell style={{ fontWeight: "600" }}>{shuttle.time}</S.Cell>
        <S.Cell>
          <Nametag data={shuttle.user} />
        </S.Cell>
        <S.Cell
          style={{
            color: "var(--darkblue)",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          취소하기
        </S.Cell>
      </S.Cells>
    </S.RowContainer>
  );
}
