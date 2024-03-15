import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Student from "../../interfaces/Student";
import { fetchStudent } from "../../api";
import { getCourse } from "../../utils/etc";
import * as S from "./StudentPageStyled";

export default function StudentPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  async function handleFecth(id: string) {
    const newStudent = await fetchStudent(id);
    setStudent(newStudent);
  }

  useEffect(() => {
    if (id) {
      handleFecth(id);
    }
  }, [id]);

  return student ? (
    <>
      <S.Container>
        <div>이름: {student.korName}</div>
        <div>상태: {student.status}</div>
        <div>
          학급:{" "}
          {student.className +
            "반 (" +
            getCourse(student.grade, student.className) +
            ")"}
        </div>
        <div>방: {student.roomNum + "호"}</div>
        <div>동아리: </div>
        <br />
        <br />
        <div>생활 관련 기록</div>
        <div>EOP 위반: 4회</div>
        <div>그린카드: 10개 - 펼치기</div>
        <div>옐로카드: 5개 - 펼치기</div>
        <div>레드카드: 1개 - 펼치기</div>
        <div>상담기록 -펼치기</div>
        <br />
        <br />
        <div>기타 인적사항</div>
        <div>학교: {student.school + " " + student.grade + "학년"}</div>
        <div>생년월일, 생일 표시기능 만들기: {student.birthDate + ""}</div>
        <div>알레르기: </div>
        <div>상의 사이즈: {student.shirtSize}</div>
        <div>자택 주소: {student.address + " (" + student.postNum + ")"}</div>
        <div>형제자매: </div>
        <div>부모 연락처</div>
        <div>{student.parent1Relation + ": " + student.parent1Phone}</div>
        <div>
          {student.parent2Relation &&
            student.parent2Relation + ": " + student.parent2Phone}
        </div>
      </S.Container>
    </>
  ) : (
    <S.Container>
      cannot find a student with id : {id}
      <br />
      <br />
      <Link to={"/"}>홈으로 돌아가기</Link>
    </S.Container>
  );
}
