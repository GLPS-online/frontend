import { useEffect, useState } from "react";
import { fetchPtla } from "../../api";
import * as S from "./StudentExpandedStyled";
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
    handleFetch({ area }).then((res) => setFloorLA(res));
  }, []);
  return (
    <S.StudentExpandedContainer>
      <div>{student.korName}</div>
      <div>클래스 PA: {classPA && classPA.korName}</div>
      <div>층 LA: {floorLA && floorLA.korName}</div>
    </S.StudentExpandedContainer>
  );
}
