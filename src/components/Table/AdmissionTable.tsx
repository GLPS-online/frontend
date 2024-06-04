import * as S from "./TableStyled";
import SearchOption from "@/interfaces/SearchOption";
import Student from "@/interfaces/Student";
import React, { useState } from "react";
import Inputs from "./Inputs";
import { useSearchParams } from "react-router-dom";
import useSearches from "@/hooks/useSearches";
import AdmissionRow from "../Row/admission/AdmissionRow";

type Props = {
  data: Student[];
};

const searchOptions: SearchOption[] = [
  {
    propName: "korName",
    inputType: "text",
    placeholder: "이름",
    searchType: "hangul",
  },
  {
    propName: "school",
    inputType: "text",
    placeholder: "학교",
    searchType: "hangul",
  },
  {
    propName: "roomNum",
    inputType: "number", // 검색 시 입력 타입
    placeholder: "방",
    searchType: "text",
  },
];

export default function AdmissionTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showIpso, setShowIpso] = useState<boolean>(true);
  const [showMiIpso, setShowMiIpso] = useState<boolean>(true);

  // 입소 / 미입소 체크박스로 선택
  let Ipsos: Student[] = [];
  let MiIpsos: Student[] = [];
  data.forEach((student) => {
    if (student.status === "active") {
      Ipsos.push(student);
    } else {
      MiIpsos.push(student);
    }
  });
  let filteredData: Student[] = [];
  if (showMiIpso) {
    filteredData = filteredData.concat(MiIpsos);
  }
  if (showIpso) {
    filteredData = filteredData.concat(Ipsos);
  }
  filteredData = useSearches(filteredData, searchOptions);

  return (
    <S.TableContainer>
      <S.IpsoButtons>
        <S.IpsoButton>
          미입소 {MiIpsos.length}명
          <input
            type="checkbox"
            checked={showMiIpso}
            onChange={(e) => setShowMiIpso(e.target.checked)}
          />
        </S.IpsoButton>
        <S.IpsoButton style={{ opacity: "0.3" }}>
          입소완료 {Ipsos.length}명
          <input
            type="checkbox"
            checked={showIpso}
            onChange={(e) => setShowIpso(e.target.checked)}
          />
        </S.IpsoButton>
      </S.IpsoButtons>
      <S.SearchBarContainer>
        <Inputs searchOptions={searchOptions} />
      </S.SearchBarContainer>
      {filteredData.map((student: Student) => (
        <S.RowContainer key={student._id}>
          <S.RowBox
            onClick={() => {
              if (!window.getSelection()?.isCollapsed) {
                console.log(window.getSelection());
                return;
              }
              if (searchParams.get("expanded") === student._id) {
                searchParams.delete("expanded");
                setSearchParams(searchParams, {
                  replace: true,
                });
              } else {
                searchParams.set("expanded", student._id);
                setSearchParams(searchParams, {
                  replace: true,
                });
              }
            }}
          >
            <AdmissionRow
              student={student}
              isExpanded={searchParams.get("expanded") === student._id}
            />
          </S.RowBox>
        </S.RowContainer>
      ))}
    </S.TableContainer>
  );
}
