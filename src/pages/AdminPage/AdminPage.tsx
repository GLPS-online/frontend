import { useState } from "react";
import * as S from "./AdminPageStyled";
import * as Placeholders from "./placeholders";
import {
  endOfCamp,
  initialize,
  createTimeTable,
  deleteTimetable,
} from "@/api/api";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState("");
  const [className, setClassName] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [office, setOffice] = useState("");
  const [classNameToDelete, setClassNameToDelete] = useState("");
  const [table, setTable] = useState("");

  async function handleInitializeStudents() {
    try {
      setIsLoading(true);
      const res = await initialize(students);
      alert(res.msg);
    } catch (err) {
      alert(err);
    } finally {
      setStudents("");
      setIsLoading(false);
    }
  }
  async function handleDeleteStudents() {
    try {
      setIsLoading(true);
      const res = await endOfCamp();
      alert(res);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleTimetableCreation() {
    try {
      setIsLoading(true);
      const res = await createTimeTable(className, advisor, office, table);
      alert(res);
    } catch (err) {
      alert(err);
    } finally {
      setClassName("");
      setAdvisor("");
      setOffice("");
      setTable("");
      setIsLoading(false);
    }
  }

  async function handleTimetableDeletion() {
    try {
      setIsLoading(true);
      const res = await deleteTimetable(classNameToDelete);
      alert(res);
    } catch (err) {
      alert(err);
    } finally {
      setClassNameToDelete("");
      setIsLoading(false);
    }
  }

  return (
    <S.Container>
      <S.Header>관리자용 페이지 입니다</S.Header>
      <S.Content>
        학생 정보 추가
        <S.Textarea
          placeholder={Placeholders.studentInitializer}
          value={students}
          onChange={(e) => setStudents(e.target.value)}
          rows={30}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleInitializeStudents}>
          추가하기
        </S.Button>
      </S.Content>
      <S.Content>
        학생 정보 전체 삭제
        <S.DangerButton disabled={isLoading} onClick={handleDeleteStudents}>
          삭제하기
        </S.DangerButton>
      </S.Content>
      <S.Content>
        시간표 추가
        <S.TextInput
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="학급 이름"
        />
        <S.TextInput
          type="text"
          value={advisor}
          onChange={(e) => setAdvisor(e.target.value)}
          placeholder="어드바이저 이름"
        />
        <S.TextInput
          type="text"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          placeholder="어드바이저 오피스"
        />
        <S.Textarea
          placeholder={Placeholders.timetable}
          value={table}
          onChange={(e) => setTable(e.target.value)}
          rows={18}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleTimetableCreation}>
          추가하기
        </S.Button>
      </S.Content>
      <S.Content>
        시간표 삭제
        <S.TextInput
          type="text"
          value={classNameToDelete}
          onChange={(e) => setClassNameToDelete(e.target.value)}
          placeholder="삭제할 학급 이름"
        />
        <S.DangerButton disabled={isLoading} onClick={handleTimetableDeletion}>
          삭제하기
        </S.DangerButton>
      </S.Content>
    </S.Container>
  );
}
