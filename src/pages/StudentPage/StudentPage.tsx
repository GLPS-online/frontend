import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Student from "@/interfaces/Student";
import { fetchStudent, updateStudent } from "@/api";
import * as S from "./StudentPageStyled";
import EditableInfo from "./EditableInfo";
import LifeInfo from "./LifeInfo";
import OtherInfo from "./OtherInfo";

export default function StudentPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);

  async function handleFecth(id: string) {
    const newStudent = await fetchStudent(id);
    setStudent(newStudent);
  }

  const navigate = useNavigate();

  async function onEdit(body: Object) {
    if (id) {
      const newStudent = await updateStudent(id, body);
      setStudent(newStudent);
    }
  }

  useEffect(() => {
    if (id) {
      handleFecth(id);
    }
  }, [id]);

  return (
    <S.PageContainer>
      {student ? (
        <>
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
      <button onClick={() => navigate(-1)}>돌아가기</button>
      <button onClick={() => navigate("/")}>홈으로</button>
    </S.PageContainer>
  );
}
