import { useEffect, useState } from "react";
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

export default function TimetablePage() {
  const navigate = useNavigate();
  const { className = classList[0] } = useParams();
  const [data, setData] = useState<{
    advisor: string;
    office: string;
    table: classInfo[];
  }>({ advisor: "", office: "", table: [] });
  const [classPA, setClassPA] = useState<User | null>(null);

  async function handleFetchTable(className: string) {
    const newData = await fetchTimetable(className);
    setData(newData);
  }

  async function handleFetchPa(params: { position?: string; area?: string }) {
    const res = await searchUser(params);
    return res;
  }

  useEffect(() => {
    handleFetchTable(className);
    let position = `${className}반 PA`;

    handleFetchPa({ position }).then((res) => setClassPA(res));
  }, [className]);

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
      {<Timetable table={data?.table} classPA={classPA} />}
      <Navigator />
    </S.Container>
  );
}
