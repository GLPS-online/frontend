import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import StudyRow from "../Row/study/StudyRow";

type Props = {
  data: any[];
};

const searchOptions = [
  {
    propName: "korName",
    inputType: "string",
    placeholder: "이름",
    searchType: "string",
  },
  {
    propName: "className",
    inputType: "string",
    placeholder: "학급",
    searchType: "string",
  },
  {
    propName: "roomNum",
    inputType: "number", // 검색 시 입력 타입
    placeholder: "방",
    searchType: "string",
  },
];

export default function StudyTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredData: any[] = data.filter((datum: any) => {
    return searchOptions.every((searchOption) => {
      if (!searchParams.get(searchOption.propName)) {
        return true;
      }
      switch (searchOption.searchType) {
        case "string":
          return datum[searchOption.propName]
            ?.toString()
            .includes(searchParams.get(searchOption.propName));
        case "number":
          return (
            searchParams.get(searchOption.propName) === "" ||
            datum[searchOption.propName] ===
              Number(searchParams.get(searchOption.propName))
          );
        default:
          return false;
      }
    });
  });
  if (filteredData.length > 0) {
    filteredData.sort((a, b) => {
      return a.student.korName.localeCompare(b.student.korName);
    });
  }

  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          {searchOptions.map((searchOption, i) => (
            <S.SearchBarInputContainer key={i}>
              <S.SearchBarInput
                autoComplete="off"
                name={searchOption.propName + "search"}
                type={searchOption.inputType}
                inputMode={
                  searchOption.inputType === "number" ? "numeric" : "text"
                }
                placeholder={searchOption.placeholder}
                value={searchParams.get(searchOption.propName) || ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (document.activeElement as HTMLElement).blur();
                  }
                }}
                onChange={(e) => {
                  if (!e.target.value) {
                    searchParams.delete(searchOption.propName);
                    setSearchParams(searchParams, {
                      replace: true,
                    });
                  } else {
                    searchParams.set(searchOption.propName, e.target.value);
                    setSearchParams(searchParams, {
                      replace: true,
                    });
                  }
                }}
              />
              <S.ClearIcon
                src="/icons/clear.svg"
                draggable={false}
                style={{
                  display: `${
                    searchParams.get(searchOption.propName) ? "" : "none"
                  }`,
                }}
                onClick={() => {
                  searchParams.delete(searchOption.propName);
                  setSearchParams(searchParams);
                }}
              />
            </S.SearchBarInputContainer>
          ))}
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
