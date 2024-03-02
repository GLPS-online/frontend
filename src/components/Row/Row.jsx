import { useState } from "react";
import "./RowStyled.js";
import Modal from "../../modals/Modal";
import * as S from "./RowStyled.js";

export default function Row({ elem, props = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <S.RowContainer
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        <S.Cell>{elem.korName}</S.Cell>
        <S.Cell>{elem.classNum || elem.role}</S.Cell>
        <S.Cell>{elem.roomNum}</S.Cell>
      </S.RowContainer>
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
