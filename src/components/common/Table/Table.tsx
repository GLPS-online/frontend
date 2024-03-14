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

type Props = {
  fetchFunction: (() => Person[]) | (() => Promise<any>);
  searchOptions: SearchOption[];
  onExpand: (arg0: Person) => React.ReactElement;
};

export default function Table({
  fetchFunction,
  searchOptions,
  onExpand,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Person[]>([]);
  const { filteredData, searches, changeSearches } = useSearches(
    data,
    searchOptions
  );
  const { displayedData, increaseLoadAmount, isThereMore } =
    useLoadAmount(filteredData);
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

      {displayedData.map((elem: Person) => (
        <Row
          key={elem._id}
          elem={elem}
          props={searchOptions}
          onExpand={() => onExpand(elem)}
        />
      ))}

      {!isLoading && isThereMore ? (
        <S.EndOfList ref={ref}>-loadging more items-</S.EndOfList>
      ) : (
        <S.EndOfList>-end of list-</S.EndOfList>
      )}
    </S.TableContainer>
  );
}
