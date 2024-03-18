import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Student from "../../interfaces/Student";
import { fetchStudent, updateStudent } from "../../api";
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

  return student ? (
    <>
      <S.PageContainer>
        <EditableInfo student={student} onEdit={onEdit} />
        <LifeInfo student={student} />
        <OtherInfo student={student} />
      </S.PageContainer>
    </>
  ) : (
    <S.PageContainer>
      cannot find a student with id : {id}
      <br />
      <br />
      <Link to={"/"}>홈으로 돌아가기</Link>
    </S.PageContainer>
  );
}
