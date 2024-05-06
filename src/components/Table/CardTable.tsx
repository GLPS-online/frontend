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
import CardRow from "../Row/card/CardRow";

type Props = {
  data: Student[];
};

export default function CardTable({ data = [] }: Props) {
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

  let filteredData: any[] = data.filter((datum: any) => {
    if (!searchParams.get("korName")) {
      return true;
    }
    return datum.student.korName
      ?.toString()
      .includes(searchParams.get("korName"));
  });

  filteredData = filteredData.filter((datum: any) => {
    if (!searchParams.get("type")) {
      return true;
    }
    return datum["type"] === searchParams.get("type"); // red green yellow
  });

  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          <S.SearchBarInputContainer>
            <S.SearchBarInput
              autoComplete="off"
              name="namesearch"
              type="text"
              inputMode="text"
              placeholder="이름"
              value={searchParams.get("korName") || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (document.activeElement as HTMLElement).blur();
                }
              }}
              onChange={(e) => {
                if (!e.target.value) {
                  searchParams.delete("korName");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                } else {
                  searchParams.set("korName", e.target.value);
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
                display: `${searchParams.get("korName") ? "" : "none"}`,
              }}
              onClick={() => {
                searchParams.delete("korName");
                setSearchParams(searchParams);
              }}
            />
          </S.SearchBarInputContainer>
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              value={searchParams.get("type") || "all"}
              onChange={(e) => {
                if (e.target.value === "all") {
                  searchParams.delete("type");
                } else {
                  searchParams.set("type", e.target.value);
                }
                setSearchParams(searchParams, { replace: true });
              }}
            >
              <option value="all">-전체-</option>
              <option value={"green"}>그린🟩</option>
              <option value={"yellow"}>옐로🟨</option>
              <option value={"red"}>레드🟥</option>
            </S.SearchBarSelect>
          </S.SearchBarInputContainer>
          <S.SearchBarInputContainer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "17px",
              fontWeight: "500",
            }}
          >
            Count: &nbsp;{filteredData.length}
          </S.SearchBarInputContainer>
        </S.SearchBarContainer>

        {filteredData.map((card: any) => (
          <S.RowContainer key={card._id}>
            <S.RowBox
              onClick={() => {
                if (!window.getSelection()?.isCollapsed) {
                  console.log(window.getSelection());
                  return;
                }
                if (searchParams.get("expanded") === card._id) {
                  searchParams.delete("expanded");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                } else {
                  searchParams.set("expanded", card._id);
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              }}
            >
              <CardRow
                card={card}
                isExpanded={searchParams.get("expanded") === card._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
