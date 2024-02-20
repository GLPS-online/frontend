import "./Students.css";
import { fetchSampleStudents, fetchStudents } from "../api";
import { useEffect, useState } from "react";
import Table from "./Table";

const LOAD = 30;

export default function Students() {
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/focus_event
  // 창 최소화했다가 다시 열면 정보 재로딩

  const [rawStudents, setRawStudents] = useState([]);
  const [loadAmount, setLoadAmount] = useState(LOAD);
  const [nameSearch, setNameSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");

  const students = rawStudents.filter((student) => {
    return (
      student.korName.includes(nameSearch) &&
      student.roomNum.toString().includes(roomSearch) &&
      (classSearch === "" || student.classNum === Number(classSearch))
    );
  });

  const displayedStudents = students.slice(
    0,
    students.length > loadAmount ? loadAmount : students.length
  );

  async function getStudetns() {
    try {
      const res = await fetchStudents();
      setRawStudents(res);
    } catch (e) {
      alert(e);
      return;
    }
  }

  function refreshData() {
    getStudetns();
    setLoadAmount(LOAD);
  }

  function increaseLoadAmount() {
    if (loadAmount >= students.length) {
      return;
    }
    setLoadAmount((prev) => {
      if (prev + LOAD >= students.length) {
        return students.length;
      }
      return prev + LOAD;
    });
  }

  useEffect(() => {
    getStudetns();
  }, []);

  return (
    <div className="students">
      <button className="refresh" onClick={refreshData}>
        새로고침
      </button>
      <div className="searches">
        <input
          name="name"
          type="text"
          placeholder="이름"
          value={nameSearch}
          onChange={(e) => {
            setNameSearch(e.target.value);
          }}
        />
        <input
          name="class"
          type="number"
          placeholder="학급"
          value={classSearch}
          onChange={(e) => {
            setClassSearch(e.target.value);
          }}
        />
        <input
          name="room"
          type="number"
          placeholder="방"
          value={roomSearch}
          onChange={(e) => {
            setRoomSearch(e.target.value);
          }}
        />
      </div>

      <Table data={displayedStudents} />

      {loadAmount < students.length ? (
        <button className="load-more" onClick={increaseLoadAmount}>
          더 보기
        </button>
      ) : (
        <div>-end of list-</div>
      )}
    </div>
  );
}
