import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import StudyRow from "../Row/study/StudyRow";
import useSearches from "@/hooks/useSearches";
import SearchOption from "@/interfaces/SearchOption";
import Inputs from "./Inputs";

type Props = {
  data: any[];
};

const searchOptions: SearchOption[] = [
  {
    propName: "korName",
    inputType: "text",
    placeholder: "이름",
    searchType: "hangul",
  },
  {
    propName: "className",
    inputType: "text",
    placeholder: "학급",
    searchType: "text",
  },
  {
    propName: "roomNum",
    inputType: "number", // 검색 시 입력 타입
    placeholder: "방",
    searchType: "text",
  },
];

export default function StudyTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredData = useSearches(data, searchOptions, null, "student");
  if (filteredData.length > 0) {
    filteredData.sort((a, b) => {
      return a.student.korName.localeCompare(b.student.korName);
    });
  }

  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          <Inputs searchOptions={searchOptions} />
        </S.SearchBarContainer>
        {filteredData.map((study: any) => (
          <S.RowContainer key={study._id}>
            <S.RowBox
              onClick={() => {
                if (!window.getSelection()?.isCollapsed) {
                  console.log(window.getSelection());
                  return;
                }
                if (searchParams.get("expanded") === study._id) {
                  searchParams.delete("expanded");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                } else {
                  searchParams.set("expanded", study._id);
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              }}
            >
              <StudyRow
                study={study}
                isExpanded={searchParams.get("expanded") === study._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
