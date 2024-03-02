import { useEffect } from "react";

import "./Table.css";
import useLoadAmount from "../../pages/useLoadAmount";
import useFetchData from "../../hooks/useFetchData";
import useSearches from "../../hooks/useSearches";
import Row from "../Row/Row";
import SearchBar from "../SearchBar/SearchBar";

//로드하려는 데이터의 api 함수, 검색 옵션, 로딩할 프롭
export default function Table({ fetchFunction, searchOptions }) {
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/focus_event
  // 창 최소화했다가 다시 열면 정보 재로딩
  const [data, fetchData, isLoading] = useFetchData(fetchFunction, []);

  const [filteredData, searches, setSearches] = useSearches(
    data,
    searchOptions
  );

  const [displayedData, resetLoadAmount, increaseLoadAmount, isThereMore] =
    useLoadAmount(filteredData);

  function refresh() {
    fetchData();
    resetLoadAmount();
  }

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      increaseLoadAmount();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1, // 0~1: 교차점의 비율
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  return (
    <div className="students">
      <button disabled={isLoading} className="refresh" onClick={refresh}>
        새로고침
      </button>
      <SearchBar
        searches={searches}
        setSearches={setSearches}
        searchOptions={searchOptions}
      />

      {displayedData.map((elem) => (
        <Row key={elem._id} elem={elem} />
      ))}

      {isThereMore() ? (
        <div id="observer" style={{ height: "10px" }}></div>
      ) : (
        <div>-end of list-</div>
      )}
    </div>
  );
}
