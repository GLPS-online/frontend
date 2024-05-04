import { toast } from "react-toastify";
import ModalContainer from "./ModalContainer";
import * as S from "./ModalStyled";
import { useForm } from "react-hook-form";
import { getCurrentTime } from "@/utils/time";
import { postStudy } from "@/api/actionApi";
import Student from "@/interfaces/Student";
import { useEffect, useState } from "react";
import { fetchStudent, updateStudent } from "@/api/studentApi";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import StudentForm from "@/components/Forms/StudentForm";

interface Props {
  handleModalClose: () => void;
  id: string;
  onSuccess: () => void;
}

export default function StudentModal({
  handleModalClose,
  id,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({ queryKey: ["students"] });
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
    <ModalContainer
      title={"학생 상세보기👶🧑‍🍼"}
      handleModalClose={handleModalClose}
    >
      {isLoading ? (
        <Spinner />
      ) : student ? (
        <>
          <StudentForm student={student} onEdit={handleUpdate} />
          <h1>상담 기록</h1>
        </>
      ) : (
        <>
          cannot find a student with id : {id}
          <br />
          <br />
        </>
      )}
    </ModalContainer>
  );
}
