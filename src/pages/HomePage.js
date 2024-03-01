import "./HomePage.css";
import { useState } from "react";
import Table from "../components/Table/Table";

import { fetchStudents } from "../api";

export default function HomePage() {
  const [dataset, setDataset] = useState(true);
  return (
    <>
      <h1>홈 입니다</h1>
      <div className="buttons">
        <button
          onClick={() => {
            setDataset(true);
          }}
        >
          학생 정보
        </button>
        <button
          onClick={() => {
            setDataset(false);
          }}
        >
          PA/TA/LA 정보
        </button>
      </div>
      <Table fetchFunction={fetchStudents} />
    </>
  );
}
