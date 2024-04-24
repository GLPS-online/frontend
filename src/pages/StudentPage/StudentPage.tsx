import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Student from "@/interfaces/Student";
import { fetchStudent, updateStudent } from "@/api/studentApi";
import * as S from "./StudentPageStyled";
import EditableInfo from "./EditableInfo";
import LifeInfo from "./LifeInfo";
import OtherInfo from "./OtherInfo";
import Navigator from "@/components/Navigator/Navigator";
import { toast } from "react-toastify";

export default function StudentPage() {
  const { id } = useParams();

  const [student, setStudent] = useState<Student | null>(null);

  async function handleFecth(id: string) {
    try {
      const newStudent = await fetchStudent(id);
      setStudent(newStudent);
    } catch (e) {
      console.log(e);
    }
  }

  async function onEdit(body: Object) {
    try {
      if (id) {
        const newStudent = await updateStudent(id, body);
        setStudent(newStudent);
      }
    } catch (err: any) {
      toast.error(err.response?.msg);
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
      <Navigator />
    </S.PageContainer>
  );
}
