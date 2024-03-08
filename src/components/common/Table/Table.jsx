import useLoadAmount from "../../../hooks/useLoadAmount";
import useSearches from "../../../hooks/useSearches";
import useAutoReload from "../../../hooks/useAutoReload";
import useInifiniteScroll from "../../../hooks/useInfiniteScroll";
import Row from "../Row/Row";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./TableStyled";
import { useEffect, useState } from "react";

export default function Table({ fetchFunction, searchOptions, onExpand }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, searches, setSearches] = useSearches(
    data,
    searchOptions
  );
  const [displayedData, increaseLoadAmount, isThereMore] =
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
        setSearches={setSearches}
        searchOptions={searchOptions}
      />

      {displayedData.map((elem) => (
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
