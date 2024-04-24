import Timetable from "./timetable/Timetable";
import { searchUser } from "@/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./TimetablePageStyled";
import Nametag from "@/components/Nametag/Nametag";
import { classInfo } from "@/interfaces/Timetable";
import User from "@/interfaces/User";
import { classList } from "@/constants";
import { fetchTimetable } from "@/api/otherApi";
import Navigator from "@/components/Navigator/Navigator";
import { useQuery } from "@tanstack/react-query";

export default function TimetablePage() {
  const navigate = useNavigate();
  const { className = classList[0] } = useParams();

  const { data: classPA } = useQuery<User | null>({
    queryKey: ["classPA", className],
    queryFn: () => searchUser({ position: `${className}반 PA` }),
    initialData: null,
  });

  const { data } = useQuery<{
    advisor: string;
    office: string;
    table: classInfo[];
  } | null>({
    queryKey: ["timetable", className],
    queryFn: () => fetchTimetable(className),
    initialData: null,
  });
  return (
    <S.Container>
      <S.ClassSelect
        value={className}
        name="className"
        onChange={(e) =>
          navigate(`/timetables/${e.target.value}`, { replace: true })
        }
      >
        {classList?.map((className, i) => (
          <option key={i} value={className}>
            {className} 반
          </option>
        ))}
      </S.ClassSelect>
      <S.InformationRow>
        <S.InformationItem>Advisor: &nbsp;{data?.advisor}</S.InformationItem>
      </S.InformationRow>
      <S.InformationRow>
        <S.InformationItem>
          Class PA: &nbsp;
          <Nametag data={classPA} displayDivision={false} forTimetable={true} />
        </S.InformationItem>
        <S.InformationItem>Office: {data?.office}</S.InformationItem>
      </S.InformationRow>
      <S.Days>
        <S.Day>MON</S.Day>
        <S.Day>TUE</S.Day>
        <S.Day>WED</S.Day>
        <S.Day>THU</S.Day>
        <S.Day>FRI</S.Day>
        <S.Day style={{ color: "darkblue" }}>SAT</S.Day>
      </S.Days>
      {<Timetable table={data?.table || []} classPA={classPA} />}
      <Navigator />
    </S.Container>
  );
}
