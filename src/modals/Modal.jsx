import { useEffect, useState } from "react";
import "./style.css";
import { fetchPtlaByRole } from "../api";

export default function Modal({ student, onClose }) {
  const [pa, setPa] = useState(null);
  async function getPa(role) {
    console.log(role);
    const newPA = await fetchPtlaByRole(role);
    setPa(newPA);
  }
  useEffect(() => {
    let num = student.classNum;
    let role = "";
    if (num < 10) {
      role = `pa_class0${num}`;
    } else {
      role = `pa_class${num}`;
    }
    getPa(role);
  }, []);
  return (
    <div className="modal-container">
      <div className="modal-contents">
        <button onClick={onClose}>
          <img src="images/close.svg" className="modal-closer" alt="close" />
        </button>
        <div className="modal-header">
          <span className="modal-title">{student.korName}</span>
          {pa && (
            <span className="modal-info">
              class{student.classNum} PA: {pa.korName}
            </span>
          )}
        </div>
        {/* {children} */}
      </div>
    </div>
  );
}
