import "./Table.css";
import useLoadAmount from "../../pages/useLoadAmount";
import useFetchData from "../../hooks/useFetchData";
import useSearches from "../../hooks/useSearches";
import Row from "../Row/Row";
import SearchBar from "../SearchBar/SearchBar";

//로드하려는 데이터의 api 함수, 검색 옵션, 로딩할 프롭
export default function Table({ fetchFunction }) {
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/focus_event
  // 창 최소화했다가 다시 열면 정보 재로딩
  const [data, fetchData, isLoading] = useFetchData(fetchFunction, []);

  const [filteredData, searches, setSearches] = useSearches(data, [
    {
      propName: "korName",
      type: "string",
      placeholder: "이름",
      realType: "string",
    },
    {
      propName: "classNum",
      type: "number",
      placeholder: "학급",
      realType: "number",
    },
    {
      propName: "roomNum",
      type: "number",
      placeholder: "방",
      realType: "string",
    },
  ]);

  const [displayedData, resetLoadAmount, increaseLoadAmount, isThereMore] =
    useLoadAmount(filteredData);

  function refresh() {
    fetchData();
    resetLoadAmount();
  }

  return (
    <div className="students">
      <button disabled={isLoading} className="refresh" onClick={refresh}>
        새로고침
      </button>
      <SearchBar
        searches={searches}
        setSearches={setSearches}
        searchOptions={[
          {
            propName: "korName",
            type: "string",
            placeholder: "이름",
            realType: "string",
          },
          {
            propName: "classNum",
            type: "number",
            placeholder: "학급",
            realType: "number",
          },
          {
            propName: "roomNum",
            type: "number",
            placeholder: "방",
            realType: "string",
          },
        ]}
      />

      {displayedData.map((elem) => (
        <Row key={elem._id} elem={elem} />
      ))}

      {isThereMore() ? (
        <button className="load-more" onClick={increaseLoadAmount}>
          더 보기
        </button>
      ) : (
        <div>-end of list-</div>
      )}
    </div>
  );
}
