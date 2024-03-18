import { useState, useEffect } from "react";
import { fetchClassList } from "../api";
import { Timetable } from "../interfaces/Timetable";

export default function useClassList() {
  const [classList, setClassList] = useState<string[]>([]);

  async function handleFetch() {
    const data: Timetable[] = await fetchClassList();
    let list: string[] = [];
    data.forEach((timetable) => list.push(timetable.className));
    setClassList(list);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return classList;
}
