import { useEffect, useState } from "react";
import Timetable from "../../components/Timetable/Timetable";
import { fetchTimetable } from "../../api";

export default function TimetablePage() {
  const [val, setVal] = useState("1");
  const [data, setData] = useState(null);

  async function handleFetch(className) {
    const newData = await fetchTimetable(className);
    setData(newData);
  }

  useEffect(() => {
    handleFetch(val);
  }, [val]);

  return (
    <>
      <select
        value={val}
        onChange={(event) => {
          setVal(event.target.value);
        }}
      >
        <option value="1">1반</option>
        <option value="2">2반</option>
        <option value="3">3반</option>
        <option value="8A">8A반</option>
      </select>
      {data && <Timetable data={data} />}
    </>
  );
}
