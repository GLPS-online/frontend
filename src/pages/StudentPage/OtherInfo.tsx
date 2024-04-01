import Student from "@/interfaces/Student";
import * as S from "./StudentPageStyled";

export default function OtherInfo({ student }: { student: Student }) {
  return (
    <S.InfoContainer>
      <div>기타 인적사항</div>
      <div>학교: {student.school + " " + student.grade + "학년"}</div>
      <div>생년월일, 생일 표시기능 만들기: {student.birthDate + ""}</div>
      <div>알레르기: {student.allergy}</div>
      <div>상의 사이즈: {student.shirtSize}</div>
      <div>자택 주소: {student.address + " (" + student.postNum + ")"}</div>
      <div>형제자매: {student.sibling}</div>
      <div>부모 연락처</div>
      <div>{student.parent1Relation + ": " + student.parent1Phone}</div>
      <div>
        {student.parent2Relation &&
          student.parent2Relation + ": " + student.parent2Phone}
      </div>
    </S.InfoContainer>
  );
}
