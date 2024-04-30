import { searchUser } from "@/api/userApi";
import { useNavigate } from "react-router-dom";
import * as S from "./ExpandedStyled";
import Student from "@/interfaces/Student";
import User from "@/interfaces/User";
import Nametag from "@/components/Nametag/Nametag";
import { useQuery } from "@tanstack/react-query";
import { SmallSpinner } from "../Spinner";

export default function StudentExpanded({ student }: { student: Student }) {
  const navigate = useNavigate();
  const { isLoading: isPALoading, data: classPA = null } =
    useQuery<User | null>({
      queryKey: ["classPA", student.className],
      queryFn: () => searchUser({ position: `${student.className}반 PA` }),
    });
  const floor: number = Math.floor(student.roomNum / 100);
  const { isLoading: isLALoading, data: floorLA = null } =
    useQuery<User | null>({
      queryKey: ["floorLA", floor],
      queryFn: () => searchUser({ area: `${floor}층` }),
    });

  return (
    <S.Container>
      <S.Cells>
        <S.Cell>{student.school + student.grade}</S.Cell>
        <S.Cell>
          {isPALoading ? <SmallSpinner /> : <Nametag data={classPA} />}
        </S.Cell>
        <S.Cell>
          {isLALoading ? <SmallSpinner /> : <Nametag data={floorLA} />}
        </S.Cell>
      </S.Cells>
      <S.Links>
        <S.Link
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/timetables/${student.className}`);
          }}
        >
          시간표
        </S.Link>
        <S.Link
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/student/${student._id}`);
          }}
        >
          세부정보/수정
        </S.Link>
      </S.Links>
    </S.Container>
  );
}
