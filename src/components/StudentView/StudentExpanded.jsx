import { useEffect, useState } from "react";
import { fetchPtla } from "../../api";
import { Link } from "react-router-dom";
import * as S from "./StudentExpandedStyled";
import Nametag from "../common/Nametag/Nametag";

export default function StudentExpanded({ student }) {
  const [classPA, setClassPA] = useState(null);
  const [floorLA, setFloorLA] = useState(null);
  async function handleFetch(role, area) {
    const res = await fetchPtla(role, area);
    return res;
  }
  useEffect(() => {
    let className = student.className;
    let role = "";
    if (className < 10) {
      role = `pa_class0${className}`;
    } else {
      role = `pa_class${className}`;
    }
    handleFetch({ role }).then((res) => setClassPA(res));
    let area = "";
    let floor = Math.floor(student.roomNum / 100);
    area = `dorm_floor_${floor}`;
    handleFetch({ area }).then((res) => setFloorLA(res));
  }, []);
  return (
    <S.StudentExpandedContainer>
      <S.Cells>
        <S.Cell>{student.school}</S.Cell>
        <S.Cell>
          <Nametag
            division={classPA?.division}
            wave={classPA?.wave}
            name={classPA?.korName}
            phone={classPA?.phone}
          />
        </S.Cell>
        <S.Cell>
          <Nametag
            division={floorLA?.division}
            wave={floorLA?.wave}
            name={floorLA?.korName}
            phone={floorLA?.phone}
          />
        </S.Cell>
      </S.Cells>

      <Link to={`/timetables/${student.className}`}>수업 시간표</Link>
      <Link to={`/timetables/${student.className}`}>정보수정</Link>
    </S.StudentExpandedContainer>
  );
}
