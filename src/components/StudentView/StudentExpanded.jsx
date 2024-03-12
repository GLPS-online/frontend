import { useEffect, useState } from "react";
import { fetchPtla } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./StudentExpandedStyled";
import Nametag from "../common/Nametag/Nametag";

export default function StudentExpanded({ student }) {
  const navigate = useNavigate();
  const [classPA, setClassPA] = useState(null);
  const [floorLA, setFloorLA] = useState(null);
  async function handleFetch(params) {
    const res = await fetchPtla(params);
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
          <Nametag data={classPA} />
        </S.Cell>
        <S.Cell>
          <Nametag data={floorLA} />
        </S.Cell>
      </S.Cells>

      <button
        onClick={() =>
          navigate("/timetables", { state: { className: student.className } })
        }
      >
        수업 시간표
      </button>
      <Link to={`/timetables/${student.className}`}>정보수정</Link>
    </S.StudentExpandedContainer>
  );
}
