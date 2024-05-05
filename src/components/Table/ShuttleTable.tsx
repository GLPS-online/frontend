import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import ShuttleRow from "../Row/shuttle/ShuttleRow";

export default function ShuttleTable({ data = [] }: { data: any[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredData: any[] = data.filter((datum: any) => {
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
  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              value={searchParams.get("time") || "all"}
              onChange={(e) => {
                if (e.target.value === "all") {
                  searchParams.delete("time");
                } else {
                  searchParams.set("time", e.target.value);
                }
                setSearchParams(searchParams, { replace: true });
              }}
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
            </S.SearchBarSelect>
          </S.SearchBarInputContainer>
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
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
        {filteredData.map((shuttle: any) => (
          <S.RowContainer key={shuttle._id}>
            <S.RowBox>
              <ShuttleRow
                shuttle={shuttle}
                isExpanded={searchParams.get("expanded") === shuttle._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
