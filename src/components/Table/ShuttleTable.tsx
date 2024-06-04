import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import ShuttleRow from "../Row/shuttle/ShuttleRow";
import Inputs from "./Inputs";
import SearchOption from "@/interfaces/SearchOption";
import useSearches from "@/hooks/useSearches";

const searchOptions: SearchOption[] = [
  {
    propName: "korName",
    inputType: "text",
    placeholder: "이름",
    searchType: "hangul",
  },
];

export default function ShuttleTable({ data = [] }: { data: any[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredData = useSearches(data, searchOptions, null, "student");
  filteredData = filteredData.filter((datum: any) => {
    if (!searchParams.get("time")) {
      return true;
    }
    if (searchParams.get("time") === "unassigned") {
      return datum["time"] === "";
    }
    return datum["time"] === searchParams.get("time");
  });
  filteredData = filteredData.filter((datum: any) => {
    if (!searchParams.get("departure")) {
      return true;
    }
    return datum["departure"] === searchParams.get("departure");
  });
  filteredData = filteredData.filter((datum: any) => {
    if (!searchParams.get("destination")) {
      return true;
    }
    return datum["destination"] === searchParams.get("destination");
  });
  console.log(filteredData);

  const timeIndex = [
    "오전등교",
    "3교시 이동",
    "오후등교",
    "7교시 이동",
    "자습수업",
  ];
  const placeIndex = [
    "덕고관",
    "영교/민교관",
    "다산/충무관",
    "체육관",
    "국궁장",
  ];
  if (filteredData.length > 0) {
    filteredData.sort((a, b) => {
      const a_time = timeIndex.indexOf(a.departure);
      const b_time = timeIndex.indexOf(b.departure);
      if (a_time !== b_time) {
        return a_time - b_time;
      }
      const a_departure = placeIndex.indexOf(a.departure);
      const b_departure = placeIndex.indexOf(b.departure);
      if (a_departure !== b_departure) {
        return a_departure - b_departure;
      }
      const a_destination = placeIndex.indexOf(a.destination);
      const b_destination = placeIndex.indexOf(b.destination);
      if (a_destination !== b_destination) {
        return a_destination - b_destination;
      }
      return a.student.korName.localeCompare(b.student.korName);
    });
  }
  return (
    <>
      <S.TableContainer>
        <S.ActionSelector
          name="timeselect"
          value={searchParams.get("time") || "all"}
          onChange={(e) => {
            if (e.target.value === "all") {
              searchParams.delete("time");
            } else {
              searchParams.set("time", e.target.value);
            }
            setSearchParams(searchParams, { replace: true });
          }}
          autoFocus
        >
          <option value="all">-시간-</option>
          <option id="오전등교" value={"오전등교"}>
            오전등교
          </option>
          <option id="3교시 이동" value={"3교시 이동"}>
            3교시 이동
          </option>
          <option id="오후등교" value={"오후등교"}>
            오후등교
          </option>
          <option id="7교시 이동" value={"7교시 이동"}>
            7교시 이동
          </option>
          <option id="자습수업" value={"자습수업"}>
            자습수업
          </option>
        </S.ActionSelector>
        <S.SearchBarContainer>
          <Inputs searchOptions={searchOptions} />
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              name="departureselect"
              value={searchParams.get("departure") || "all"}
              onChange={(e) => {
                if (e.target.value === "all") {
                  searchParams.delete("departure");
                } else {
                  searchParams.set("departure", e.target.value);
                }
                setSearchParams(searchParams, { replace: true });
              }}
            >
              <option value="all">-출발지-</option>
              <option id="덕고관" value={"덕고관"}>
                덕고관
              </option>
              <option id="영교/민교관" value={"영교/민교관"}>
                영교/민교관
              </option>
              <option id="다산/충무관" value={"다산/충무관"}>
                다산/충무관
              </option>
              <option id="체육관" value={"체육관"}>
                체육관
              </option>
              <option id="국궁장" value={"국궁장"}>
                국궁장
              </option>
            </S.SearchBarSelect>
          </S.SearchBarInputContainer>
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              name="destinationselect"
              value={searchParams.get("destination") || "all"}
              onChange={(e) => {
                if (e.target.value === "all") {
                  searchParams.delete("destination");
                } else {
                  searchParams.set("destination", e.target.value);
                }
                setSearchParams(searchParams, { replace: true });
              }}
            >
              <option value="all">-도착지-</option>
              <option id="덕고관" value={"덕고관"}>
                덕고관
              </option>
              <option id="영교/민교관" value={"영교/민교관"}>
                영교/민교관
              </option>
              <option id="다산/충무관" value={"다산/충무관"}>
                다산/충무관
              </option>
              <option id="체육관" value={"체육관"}>
                체육관
              </option>
              <option id="국궁장" value={"국궁장"}>
                국궁장
              </option>
            </S.SearchBarSelect>
          </S.SearchBarInputContainer>
        </S.SearchBarContainer>
        {searchParams.get("time") ? (
          filteredData.length > 0 ? (
            filteredData.map((shuttle: any) => (
              <S.RowContainer key={shuttle._id}>
                <S.RowBox
                  onClick={() => {
                    if (!window.getSelection()?.isCollapsed) {
                      console.log(window.getSelection());
                      return;
                    }
                    if (searchParams.get("expanded") === shuttle._id) {
                      searchParams.delete("expanded");
                      setSearchParams(searchParams, {
                        replace: true,
                      });
                    } else {
                      searchParams.set("expanded", shuttle._id);
                      setSearchParams(searchParams, {
                        replace: true,
                      });
                    }
                  }}
                >
                  <ShuttleRow
                    shuttle={shuttle}
                    isExpanded={searchParams.get("expanded") === shuttle._id}
                  />
                </S.RowBox>
              </S.RowContainer>
            ))
          ) : (
            <div
              style={{
                alignSelf: "center",
                fontSize: "18px",
              }}
            >
              검색 결과가 없습니다
            </div>
          )
        ) : (
          <div
            style={{
              alignSelf: "center",
              fontSize: "18px",
            }}
          >
            셔틀 시간을 선택하세요
          </div>
        )}
      </S.TableContainer>
    </>
  );
}
