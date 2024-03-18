import useLoadAmount from "../../../hooks/useLoadAmount";
import useSearches from "../../../hooks/useSearches";
import useAutoReload from "../../../hooks/useAutoReload";
import useInifiniteScroll from "../../../hooks/useInfiniteScroll";
import Row from "../Row/Row";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./TableStyled";
import { useEffect, useState } from "react";
import SearchOption from "../../../interfaces/SearchOptions";
import Person from "../../../interfaces/Person";
import useCheckbox from "../../../hooks/useCheckbox";

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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Person[]>([]);
  const { selectedItems, clearItems, handleCheckAll, handleCheckboxChange } =
    useCheckbox();
  const { filteredData, searches, changeSearches } = useSearches(
    data,
    selectedItems,
    searchOptions
  );
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
  const { displayedData, increaseLoadAmount, isThereMore } =
    useLoadAmount(filteredData);
  const [action, setAction] = useState<string>("default");

  const refresh = () => {
    handleFetch();
  };

  useAutoReload(refresh);
  const ref = useInifiniteScroll(increaseLoadAmount, isLoading);

  async function handleFetch() {
    setIsLoading(true);
    const newData = await fetchFunction();
    setData(newData);
    setIsLoading(false);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <S.TableContainer>
      <SearchBar
        searches={searches}
        changeSearches={changeSearches}
        searchOptions={searchOptions}
      />
      <S.ActionBar $visible={selectable}>
        <S.CheckBox
          type={action !== "default" ? "checkbox" : "hidden"}
          disabled={isThereMore}
          checked={
            selectedItems.length !== 0 &&
            displayedData.length === selectedItems.length
          }
          onClick={(e) => handleCheckAll(e, displayedData)}
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
      {displayedData.map((elem: Person) => (
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
            onExpand={onExpand && (() => onExpand(elem))}
          />
        </S.RowContainer>
      ))}

      {!isLoading && isThereMore ? (
        <S.EndOfList ref={ref}>-loadging more items-</S.EndOfList>
      ) : (
        <S.EndOfList>-end of list-</S.EndOfList>
      )}
    </S.TableContainer>
  );
}
