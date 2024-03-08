import { useEffect, useState } from "react";
import Timetable from "../../components/Timetable/Timetable";
import { fetchTimetable } from "../../api";
import useClassList from "../../hooks/useClassList";

export default function TimetablePage({ defaultClass }) {
  const [val, setVal] = useState(null);
  const [table, setTable] = useState([]);
  const classList = useClassList();

  async function handleFetch(className) {
    const newData = await fetchTimetable(className);
    setTable(newData.table || []);
  }

  useEffect(() => {
    if (classList) {
      if (classList.includes(defaultClass)) {
        setVal(defaultClass);
      }
      setVal(classList[0]);
    }
  }, [classList, defaultClass]);

  useEffect(() => {
    if (val != null) {
      handleFetch(val);
    }
  }, [val]);

  return (
    <>
      {val && (
        <select
          value={val}
          onChange={(event) => {
            setVal(event.target.value);
          }}
        >
          {classList?.map((className, i) => (
            <option key={i} value={className}>
              {className}반
            </option>
          ))}
        </select>
      )}
      {table && <Timetable table={table} />}
    </>
  );
}
