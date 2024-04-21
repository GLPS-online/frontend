import { useEffect, useState } from "react";
import { searchUser } from "@/api";
import { Link } from "react-router-dom";
import * as S from "./StudentExpandedStyled";
import Student from "@/interfaces/Student";
import User from "@/interfaces/User";
import Nametag from "@/components/Nametag/Nametag";

export default function StudentExpanded({ student }: { student: Student }) {
  const [classPA, setClassPA] = useState<User | null>(null);
  const [floorLA, setFloorLA] = useState<User | null>(null);
  async function handleFetch(params: { position?: string; area?: string }) {
    const res = await searchUser(params);
    return res;
  }
  useEffect(() => {
    let position = `${student.className}반 PA`;

    handleFetch({ position }).then((res) => setClassPA(res));
    let area = "";
    let floor: number = Math.floor(student.roomNum / 100);
    area = `dorm${floor}f`;
    handleFetch({ area }).then((res) => setFloorLA(res));
  }, [student]);

  return (
    <S.StudentExpandedContainer>
      <S.Cells>
        <S.Cell>{student.school}</S.Cell>
        <S.Cell>
          <Nametag data={classPA} />
        </S.Cell>
        <S.Cell>
          <Nametag data={floorLA} />
        </S.Cell>
      </S.Cells>
      <Link to={`/timetables/${student.className}`}>수업 시간표</Link>
      <Link to={`/student/${student._id}`}>세부정보/수정</Link>
      <Link to={``}>EOP 검사</Link>
      <Link to={``}>카드 확인</Link>
    </S.StudentExpandedContainer>
  );
}
