import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import Student from "@/interfaces/Student";
import ClubRow from "../Row/ClubRow";
import { clubList } from "@/constants";
import { searchClubPAs } from "@/api/clubAPI";
import { useEffect, useState } from "react";
import User from "@/interfaces/User";
import Nametag from "../Nametag/Nametag";

type Props = {
  data: Student[];
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
];

export default function ClubTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const clubName = searchParams.get("club") || "";
  const [isPALoading, setIsPALoading] = useState(false);
  const [clubPAs, setClubPAs] = useState<User[]>([]);

  async function handleFetch(clubName: string) {
    setIsPALoading(true);
    try {
      const newClubPAs = await searchClubPAs(clubName);
      setClubPAs(newClubPAs);
    } catch (err) {
    } finally {
      setIsPALoading(false);
    }
  }

  useEffect(() => {
    setClubPAs([]);
    if (clubName) {
      handleFetch(clubName);
    }
  }, [clubName]);

  let filteredData: Student[] = data.filter((datum: any) => {
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

  filteredData = filteredData.filter((datum: any) => {
    if (!searchParams.get("club")) {
      return true;
    }
    if (searchParams.get("club") === "unassigned") {
      return datum["club"] === "";
    }
    return datum["club"] === searchParams.get("club");
  });

  return (
    <>
      <S.TableContainer>
        <S.InformationRow>
          <span>
            지도교사: &nbsp;
            {isPALoading &&
              clubPAs.map((PA, i) => (
                <Nametag key={i} data={PA} displayDivision={true} />
              ))}
          </span>
          <span>인원: &nbsp;{filteredData.length}</span>
        </S.InformationRow>
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
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              value={searchParams.get("club") || "all"}
              onChange={(e) => {
                if (e.target.value === "all") {
                  searchParams.delete("club");
                } else {
                  searchParams.set("club", e.target.value);
                }
                setSearchParams(searchParams, { replace: true });
              }}
            >
              <option value="all">-전체-</option>
              {clubList?.map((club, i) => (
                <option key={i} id={club} value={club}>
                  {club}
                </option>
              ))}
              <option value="unassigned">-미배정-</option>
            </S.SearchBarSelect>
          </S.SearchBarInputContainer>
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
              <ClubRow
                student={student}
                isExpanded={searchParams.get("expanded") === student._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
