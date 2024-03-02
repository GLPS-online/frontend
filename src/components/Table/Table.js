import { useEffect, useRef } from "react";

import useLoadAmount from "../../hooks/useLoadAmount";
import useFetchData from "../../hooks/useFetchData";
import useSearches from "../../hooks/useSearches";
import Row from "../Row/Row";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./TableStyled";
import useAutoReload from "../../hooks/useAutoReload";
import useInifiniteScroll from "../../hooks/useInfiniteScroll";

export default function Table({ fetchFunction, searchOptions }) {
  const [data, fetchData, isLoading] = useFetchData(fetchFunction, []);
  const [filteredData, searches, setSearches] = useSearches(
    data,
    searchOptions
  );
  const [displayedData, resetLoadAmount, increaseLoadAmount, isThereMore] =
    useLoadAmount(filteredData);
  const refresh = () => {
    fetchData();
    resetLoadAmount();
  };
  useAutoReload(refresh);
  const ref = useInifiniteScroll(increaseLoadAmount, isLoading);

  return (
    <S.TableContainer>
      <SearchBar
        searches={searches}
        setSearches={setSearches}
        searchOptions={searchOptions}
      />

      {displayedData.map((elem) => (
        <Row key={elem._id} elem={elem} />
      ))}

      {!isLoading && isThereMore ? (
        <S.EndOfList ref={ref}>-loadging more items-</S.EndOfList>
      ) : (
        <S.EndOfList>-end of list-</S.EndOfList>
      )}
    </S.TableContainer>
  );
}
