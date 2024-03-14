import { useEffect, useState } from "react";
import Timetable from "../../components/Timetable/Timetable";
import { fetchPtla, fetchTimetable } from "../../api";
import useClassList from "../../hooks/useClassList";
import { useLocation } from "react-router-dom";
import * as S from "./TimetablePageStyled";
import Nametag from "../../components/common/Nametag/Nametag";
import { classInfo } from "../../interfaces/Timetable";
import Ptla from "../../interfaces/Ptla";

export default function TimetablePage() {
  const { state } = useLocation();
  const { className: defaultClass } = state || {};
  const [val, setVal] = useState<string | null>(null);
  const [table, setTable] = useState<classInfo[]>([]);
  const [advisor, setAdvisor] = useState("");
  const [office, setOffice] = useState("");
  const [classPA, setClassPA] = useState<Ptla | null>(null);
  const classList = useClassList();

  async function handleFetchTable(className: string) {
    const newData = await fetchTimetable(className);
    setTable(newData?.table || []);
    setAdvisor(newData?.advisor || "");
    setOffice(newData?.office || "");
  }

  async function handleFetchPa(params: { role?: string; area?: string }) {
    const res = await fetchPtla(params);
    return res;
  }

  useEffect(() => {
    if (classList) {
      if (defaultClass && classList.includes(defaultClass)) {
        setVal(defaultClass);
      } else {
        setVal(classList[0]);
      }
    }
  }, [classList, defaultClass]);

  useEffect(() => {
    if (val != null) {
      handleFetchTable(val);
      let role = "";
      if (Number(val) < 10) {
        role = `pa_class0${val}`;
      } else {
        role = `pa_class${val}`;
      }
      handleFetchPa({ role }).then((res) => setClassPA(res));
    }
  }, [val]);

  return (
    <S.Container>
      {val && (
        <S.ClassSelect
          value={val}
          onChange={(event) => {
            setVal(event.target.value);
          }}
        >
          {classList?.map((className, i) => (
            <option key={i} value={className}>
              Class {className}
            </option>
          ))}
        </S.ClassSelect>
      )}
      <S.InformationRow>
        <S.InformationItem>Advisor: {advisor}</S.InformationItem>
      </S.InformationRow>
      <S.InformationRow>
        <S.InformationItem>
          Class PA: <Nametag data={classPA} displayDivision={false}></Nametag>
        </S.InformationItem>
        <S.InformationItem>Office: {office}</S.InformationItem>
      </S.InformationRow>
      {table && classPA && <Timetable table={table} classPA={classPA} />}
    </S.Container>
  );
}
