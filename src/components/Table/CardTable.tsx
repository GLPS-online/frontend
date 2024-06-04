import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import CardRow from "../Row/card/CardRow";
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
];

export default function CardTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  let filteredData = useSearches(data, searchOptions, null, "student");

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
