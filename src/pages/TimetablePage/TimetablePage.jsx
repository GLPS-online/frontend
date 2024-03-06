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
        <option value="4">4반</option>
        <option value="5">5반</option>
        <option value="6">6반</option>
        <option value="7">7반</option>
        <option value="8">8반</option>
        <option value="9">9반</option>
        <option value="10">10반</option>
        <option value="11">11반</option>
        <option value="12">12반</option>
        <option value="13">13반</option>
        <option value="14">14반</option>
        <option value="15">15반</option>
        <option value="16">16반</option>
        <option value="17">17반</option>
        <option value="18">18반</option>
        <option value="19">19반</option>
        <option value="20">20반</option>
        <option value="21">21반</option>
      </select>
      {data && <Timetable data={data} />}
    </>
  );
}
