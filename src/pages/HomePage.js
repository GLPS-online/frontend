import { fetchSampleStudents } from "../api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [students, setStudents] = useState([]);
  async function getStudetns() {
    try {
      const res = await fetchSampleStudents();
      console.log(res);
      setStudents(res);
    } catch (e) {
      alert(e);
      return;
    }
  }

  useEffect(() => {
    getStudetns();
  }, []);

  return (
    <>
      <h1>홈 입니다</h1>

      {students.map((student) => (
        <div key={student.id}>{student.korName}</div>
      ))}
    </>
  );
}
