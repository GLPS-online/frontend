import { useEffect, useState } from "react";
import { fetchPtla } from "../../api";
import { Link } from "react-router-dom";
import * as S from "./StudentExpandedStyled";
import { getCurrentTime, getCurrentTimetableIndex } from "../../utils/time";
// import { fetchPtla } from "../api";

export default function StudentExpanded({ student }) {
  const [classPA, setClassPA] = useState(null);
  const [floorLA, setFloorLA] = useState(null);
  const [subjectTA, setSubjectTA] = useState(null);
  async function handleFetch(role, area) {
    const res = await fetchPtla(role, area);
    return res;
  }
  useEffect(() => {
    let num = student.className;
    let role = "";
    if (num < 10) {
      role = `pa_class0${num}`;
    } else {
      role = `pa_class${num}`;
    }
    handleFetch({ role }).then((res) => setClassPA(res));
    let area = "glps_hq";
    handleFetch({ area }).then((res) => setFloorLA(res));
    area = "glps_hq";
    handleFetch({ area }).then((res) => setSubjectTA(res));
  }, []);
  return (
    <S.StudentExpandedContainer>
      <div>{student.korName}</div>
      <div>클래스 PA: {classPA?.korName || "-"}</div>
      <div>층 LA: {floorLA?.korName || "-"}</div>
      <div>현재 수업 TA: {subjectTA?.korName || "-"}</div>
      <div>{getCurrentTimetableIndex()}</div>
      <Link to={`/timetables/${student.className}`}>시간표 보기</Link>
    </S.StudentExpandedContainer>
  );
}
