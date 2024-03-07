import { useEffect, useState } from "react";
import Timetable from "../../components/Timetable/Timetable";
import { fetchTimetables } from "../../api";

export default function TimetablePage({ defaultClass }) {
  const [data, setData] = useState(null);
  const [val, setVal] = useState(null);
  const [table, setTable] = useState([]);

  async function handleFetchTables() {
    const newData = await fetchTimetables();
    setData(newData);
    const list = [];
    newData.forEach((timetable) => list.push(timetable.className));
    if (list.includes(defaultClass)) {
      setVal(defaultClass);
      return;
    }
    setVal(newData[0].className);
  }

  useEffect(() => {
    if (data) {
      setTable(data.find(({ className }) => className === val).table);
    }
  }, [val]);

  useEffect(() => {
    handleFetchTables();
  }, []);

  return (
    <>
      {val && (
        <select
          value={val}
          onChange={(event) => {
            setVal(event.target.value);
          }}
        >
          {data?.map((timetable, i) => (
            <option key={i} value={timetable.className}>
              {timetable.className}반
            </option>
          ))}
        </select>
      )}
      {table && <Timetable table={table} />}
    </>
  );
}
