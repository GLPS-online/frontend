import { useState, useEffect } from "react";
import { fetchTimetables } from "../api";

export default function useClassList() {
  const [classList, setClassList] = useState([]);

  async function handleFetch() {
    const data = await fetchTimetables();
    const list = [];
    data.forEach((timetable) => list.push(timetable.className));
    console.log(list);
    setClassList(list);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return classList;
}
