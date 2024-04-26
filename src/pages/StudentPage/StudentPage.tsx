import { useParams } from "react-router-dom";
import Student from "@/interfaces/Student";
import { fetchStudent, updateStudent } from "@/api/studentApi";
import * as S from "./StudentPageStyled";
import EditableInfo from "./EditableInfo";
import LifeInfo from "./LifeInfo";
import OtherInfo from "./OtherInfo";
import Navigator from "@/components/Navigator/Navigator";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

export default function StudentPage() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { isLoading, data: student = null } = useQuery<Student | null>({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id || ""),
    enabled: id !== "",
  });

  async function onEdit(body: Object) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        queryClient.setQueryData(["student", id], {
          ...queryClient.getQueriesData({
            queryKey: ["student", id],
          }),
          ...body,
        });
        await updateStudent(id, body);
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 5000,
          isLoading: false,
        });
      } finally {
        queryClient.invalidateQueries({ queryKey: ["student", id] });
      }
    }
  }

  return (
    <S.PageContainer>
      {isLoading ? (
        <Spinner />
      ) : student ? (
        <>
          <h1>학생 상세보기</h1>
          <EditableInfo student={student} onEdit={onEdit} />
          <LifeInfo student={student} />
          <OtherInfo student={student} />
        </>
      ) : (
        <>
          cannot find a student with id : {id}
          <br />
          <br />
        </>
      )}
      <Navigator />
    </S.PageContainer>
  );
}
