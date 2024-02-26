import { useState } from "react";
import "./Row.css";
import Modal from "../modals/Modal";

export default function Row({ elem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="row"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div>{elem.korName}</div>
        <div>{elem.classNum || elem.role}</div>
        <div>{elem.roomNum}</div>
      </div>
      {isModalOpen && (
        <Modal
          student={elem}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
