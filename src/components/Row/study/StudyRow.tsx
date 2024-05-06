import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as S from "../RowStyled";
import { toast } from "react-toastify";
import { deleteStudy } from "@/api/actionApi";
import Nametag from "@/components/Nametag/Nametag";
import User from "@/interfaces/User";
import { searchUser } from "@/api/userApi";
import { SmallSpinner } from "@/components/Spinner";
type Props = {
  study: any;
  isExpanded?: boolean;
};

// const displayProps = ["korName", "className", "roomNum"];

export default function StudyRow({ study, isExpanded = false }: Props) {
  const queryClient = useQueryClient();
  const student = study.student;
  const { isLoading: isPALoading, data: classPA = null } =
    useQuery<User | null>({
      queryKey: ["classPA", student.className],
      queryFn: () => searchUser({ position: `${student.className}반 PA` }),
      enabled: isExpanded,
    });
  const floor: number = Math.floor(student.roomNum / 100);
  const { isLoading: isLALoading, data: floorLA = null } =
    useQuery<User | null>({
      queryKey: ["floorLA", floor],
      queryFn: () => searchUser({ area: `${floor}층` }),
      enabled: isExpanded,
    });
  async function handleDelete() {
    const toastId = toast.loading("취소 중...");
    try {
      await deleteStudy(study._id);
      await queryClient.invalidateQueries({ queryKey: ["studies"] });
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
        <S.Cell>{study.student.korName}</S.Cell>
        <S.Cell>{study.student.className}</S.Cell>
        <S.Cell>{study.student.roomNum}</S.Cell>
      </S.Cells>
      {isExpanded && (
        <S.Cells style={{ marginTop: "7px" }}>
          <S.Cell>
            <span
              style={{
                color: "var(--darkblue)",
                textDecoration: "underline",
                fontSize: "17px",
                cursor: "pointer",
              }}
              onClick={handleDelete}
            >
              취소하기
            </span>
          </S.Cell>
          <S.Cell>
            {isPALoading ? <SmallSpinner /> : <Nametag data={classPA} />}
          </S.Cell>
          <S.Cell>
            {isLALoading ? <SmallSpinner /> : <Nametag data={floorLA} />}
          </S.Cell>
        </S.Cells>
      )}
    </S.RowContainer>
  );
}
