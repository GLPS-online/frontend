import { useState } from "react";
import "./Row.css";
import Modal from "../../modals/Modal";

export default function Row({ elem, props = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div
        className="row"
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        <div>{elem.korName}</div>
        <div>{elem.classNum || elem.role}</div>
        <div>{elem.roomNum}</div>
      </div>
      {isExpanded && (
        <Modal
          student={elem}
          onClose={() => {
            setIsExpanded(false);
          }}
        />
      )}
    </>
  );
}
