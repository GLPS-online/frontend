import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import EopRow from "../Row/eop/EopRow";
import useSearches from "@/hooks/useSearches";
import SearchOption from "@/interfaces/SearchOption";
import Inputs from "./Inputs";

type Props = {
  data: any[];
};

const searchOptions: SearchOption[] = [
  {
    propName: "korName",
    inputType: "string",
    placeholder: "이름",
    searchType: "hangul",
  },
];

export default function EopTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  let filteredData = useSearches(data, searchOptions, null, "student");

  filteredData = filteredData.filter((datum: any) => {
    if (!searchParams.get("type")) {
      return true;
    }
    switch (searchParams.get("type")) {
      case "approved":
        return datum.isApproved;
      case "not":
        return !datum.isApproved;
      default:
        return true;
    }
  });

  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          <Inputs searchOptions={searchOptions} />
          <S.SearchBarInputContainer>
            <S.SearchBarSelect
              name="typeselect"
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
              <option value={"approved"}>통과🆗</option>
              <option value={"not"}>미검사❌</option>
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

        {filteredData.map((eop: any) => (
          <S.RowContainer key={eop._id}>
            <S.RowBox
              onClick={() => {
                if (!window.getSelection()?.isCollapsed) {
                  console.log(window.getSelection());
                  return;
                }
                if (searchParams.get("expanded") === eop._id) {
                  searchParams.delete("expanded");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                } else {
                  searchParams.set("expanded", eop._id);
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              }}
            >
              <EopRow
                eop={eop}
                isExpanded={searchParams.get("expanded") === eop._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
