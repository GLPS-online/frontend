import { useState } from "react";
import * as S from "./RowStyled";
import SearchOption from "../../../interfaces/SearchOptions.js";

type Props = {
  elem: any;
  props: SearchOption[];
  selected: string;
  onExpand?: () => React.ReactElement | undefined;
};

export default function Row({ elem, props, selected, onExpand }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded((prev) => !prev);
  return (
    <>
      <S.RowContainer $selected={selected}>
        <S.Cells onClick={handleExpand}>
          {props.map((option: SearchOption, i: number) => (
            <S.Cell key={i}>{elem[option.propName]}</S.Cell>
          ))}
        </S.Cells>
        {onExpand && isExpanded && onExpand()}
      </S.RowContainer>
    </>
  );
}
