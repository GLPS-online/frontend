import { useState } from "react";
import * as S from "./RowStyled";
import SearchOption from "../../../interfaces/SearchOptions.js";

type Props = {
  elem: any;
  props: SearchOption[];
  onExpand: () => React.ReactElement;
};

export default function Row({ elem, props, onExpand }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded((prev) => !prev);
  return (
    <>
      <S.RowContainer>
        <S.Cells onClick={handleExpand}>
          {props.map((option: SearchOption, i: number) => (
            <S.Cell key={i}>{elem[option.propName]}</S.Cell>
          ))}
        </S.Cells>
        {isExpanded && onExpand()}
      </S.RowContainer>
    </>
  );
}
