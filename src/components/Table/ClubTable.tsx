import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import Student from "@/interfaces/Student";
import ClubRow from "../Row/club/ClubRow";
import { clubList } from "@/constants";
import { searchClubPAs } from "@/api/clubAPI";
import { useEffect, useState } from "react";
import User from "@/interfaces/User";
import Nametag from "../Nametag/Nametag";
import { SmallSpinner } from "../Spinner";
import useSearches from "@/hooks/useSearches";
import SearchOption from "@/interfaces/SearchOption";
import Inputs from "./Inputs";

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
    propName: "className",
    inputType: "text",
    placeholder: "학급",
    searchType: "text",
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

  let filteredData = useSearches(data, searchOptions);

  filteredData = filteredData.filter((datum: Student) => {
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
          <span style={{ display: "flex", alignItems: "center" }}>
            지도교사: &nbsp;
            {isPALoading ? (
              <SmallSpinner />
            ) : (
              clubPAs.map((PA, i) => (
                <Nametag key={i} data={PA} displayDivision={true} />
              ))
            )}
          </span>
          <span style={{ display: "flex", alignItems: "center" }}>
            인원: &nbsp;{filteredData.length}
          </span>
        </S.InformationRow>
        <S.SearchBarContainer>
          <Inputs searchOptions={searchOptions} />
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              name="clubselect"
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
