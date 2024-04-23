import { useEffect, useState } from "react";
import { searchUser } from "@/api/userApi";
import { useNavigate } from "react-router-dom";
import * as S from "./StudentExpandedStyled";
import Student from "@/interfaces/Student";
import User from "@/interfaces/User";
import Nametag from "@/components/Nametag/Nametag";

export default function StudentExpanded({ student }: { student: Student }) {
  const navigate = useNavigate();
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
    area = `${floor}층`;
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
      <S.Links>
        <S.Link
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/timetables/${student.className}/`);
          }}
        >
          시간표
        </S.Link>
        <S.Link
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/student/${student._id}/`);
          }}
        >
          세부정보/수정
        </S.Link>
      </S.Links>
      {/* <Link to="/">EOP 검사</Link>
      <Link to={``}>카드 확인</Link> */}
    </S.StudentExpandedContainer>
  );
}
