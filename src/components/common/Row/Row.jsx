import { useState } from "react";
import * as S from "./RowStyled.js";

export default function Row({ elem, props, onExpand }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded((prev) => !prev);
  return (
    <>
      <S.RowContainer onClick={handleExpand}>
        {isExpanded
          ? onExpand()
          : props.map((option, i) => (
              <S.Cell key={i}>{elem[option.propName]}</S.Cell>
            ))}
        {}
      </S.RowContainer>
    </>
  );
}
