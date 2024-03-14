import { useState, useEffect } from "react";
import { fetchTimetables } from "../api";
import { Timetable } from "../interfaces/Timetable";

export default function useClassList() {
  const [classList, setClassList] = useState<string[]>([]);

  async function handleFetch() {
    const data: Timetable[] = await fetchTimetables();
    let list: string[] = [];
    data.forEach((timetable) => list.push(timetable.className));
    setClassList(list);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return classList;
}
