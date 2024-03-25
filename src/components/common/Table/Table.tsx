import Row from "../Row/Row";
import * as S from "./TableStyled";
import { useState } from "react";
import SearchOption from "../../../interfaces/SearchOptions";
import Person from "../../../interfaces/Person";
import useCheckbox from "../../../hooks/useCheckbox";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

type Props = {
  fetchFunction: (() => Person[]) | (() => Promise<any>);
  searchOptions: SearchOption[];
  selectable?: boolean;
  onExpand?: (arg0: Person) => React.ReactElement;
};

export default function Table({
  fetchFunction,
  searchOptions,
  selectable = false,
  onExpand,
}: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchFunction,
    initialData: [],
  });
  const { selectedItems, clearItems, handleCheckAll, handleCheckboxChange } =
    useCheckbox();

  const [searchParams, setSearchParams] = useSearchParams();

  // let filteredData: Person[] = data;
  const filteredData: Person[] = data.filter((datum: any) => {
    if (selectedItems.includes(datum._id)) {
      return true;
    }
    return searchOptions.every((searchOption) => {
      if (!searchParams.get(searchOption.propName)) {
        return true;
      }
      switch (searchOption.searchType) {
        case "string":
          return datum[searchOption.propName]
            .toString()
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

  if (selectedItems.length !== 0) {
    filteredData.sort((a, b) => {
      const a_inc = selectedItems.includes(a._id);
      const b_inc = selectedItems.includes(b._id);
      if (a_inc && b_inc) {
        return a.korName.localeCompare(b.korName);
      } else if (a_inc) {
        return -1;
      } else if (b_inc) {
        return +1;
      } else return 0;
    });
  }
  const [action, setAction] = useState<string>("default");

  if (isPending) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <S.TableContainer>
      <S.SearchBarContainer>
        {searchOptions.map((searchOption, i) => (
          <S.SearchBarInput
            key={i}
            autoComplete="off"
            type={searchOption.inputType}
            inputMode={searchOption.inputType === "number" ? "numeric" : "text"}
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
                setSearchParams(searchParams);
              } else {
                searchParams.set(searchOption.propName, e.target.value);
                setSearchParams(searchParams, {
                  replace: true,
                });
              }
            }}
          />
        ))}
      </S.SearchBarContainer>
      <S.ActionBar $visible={selectable}>
        <S.CheckBox
          type={action !== "default" ? "checkbox" : "hidden"}
          disabled={filteredData.length > 50}
          checked={
            selectedItems.length !== 0 &&
            filteredData.length === selectedItems.length
          }
          onClick={(e) => handleCheckAll(e, filteredData)}
          value={"all"}
          onChange={(e) => {}}
        />
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value={"default"}>액션 선택</option>
          <option value={"study"}>2자습신청</option>
          <option value={"shuttle"}>목발셔틀신청</option>
          <option value={"eop"}>EOP 적발</option>
          <option value={"green"}>그린카드</option>
          <option value={"yellow"}>옐로카드</option>
          <option value={"red"}>레드카드</option>
        </select>
        <button
          disabled={action === "default"}
          onClick={() => {
            clearItems();
            setAction("default");
          }}
        >
          취소
        </button>
      </S.ActionBar>
      {filteredData.map((elem: Person) => (
        <S.RowContainer key={elem._id}>
          <S.CheckBox
            type={selectable && action !== "default" ? "checkbox" : "hidden"}
            value={elem._id}
            checked={selectedItems.includes(elem._id)}
            onChange={handleCheckboxChange}
          />
          <Row
            elem={elem}
            props={searchOptions}
            selected={selectedItems.includes(elem._id) ? action : "default"}
            expanded={searchParams.get("expanded") === elem._id}
            onExpand={onExpand && (() => onExpand(elem))}
          />
        </S.RowContainer>
      ))}
    </S.TableContainer>
  );
}
