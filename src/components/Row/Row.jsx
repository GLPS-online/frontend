import { useState } from "react";
import "./RowStyled.js";
import Modal from "../../modals/Modal";
import * as S from "./RowStyled.js";

export default function Row({ elem, searchOptions }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <S.RowContainer
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        {searchOptions.map((option, i) => (
          <S.Cell key={i}>{elem[option.propName]}</S.Cell>
        ))}
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
