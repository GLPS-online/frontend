import { useEffect, useState } from "react";
import Timetable from "../../components/Timetable/Timetable";
import { fetchTimetable } from "../../api";
import useClassList from "../../hooks/useClassList";
import { useParams } from "react-router-dom";

export default function TimetablePage() {
  const { className: defaultClass } = useParams();
  const [val, setVal] = useState(null);
  const [table, setTable] = useState([]);
  const classList = useClassList();

  async function handleFetch(className) {
    const newData = await fetchTimetable(className);
    setTable(newData.table || []);
  }

  useEffect(() => {
    if (classList) {
      if (defaultClass && classList.includes(defaultClass)) {
        setVal(defaultClass);
      } else {
        setVal(classList[0]);
      }
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
