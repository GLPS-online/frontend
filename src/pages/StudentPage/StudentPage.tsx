import { useParams } from "react-router-dom";
import Student from "@/interfaces/Student";
import { fetchStudent, updateStudent } from "@/api/studentApi";
import * as S from "./StudentPageStyled";
import LifeInfo from "./LifeInfo";
import Navigator from "@/components/Navigator/Navigator";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import StudentForm from "../../components/Forms/StudentForm";

export default function StudentPage() {
  const { id } = useParams();

  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function handlefetch(id: string) {
      setIsLoading(true);
      try {
        const newStudent = await fetchStudent(id);
        setStudent(newStudent);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      handlefetch(id);
    }
  }, [id]);

  async function handleUpdate(id: string, body: any) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        const updated = await updateStudent(id, body);
        setStudent(updated);
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
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
          <StudentForm student={student} onEdit={handleUpdate} />
          <h1>상담 기록</h1>
          <LifeInfo student={student} />
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
