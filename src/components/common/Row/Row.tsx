import * as S from "./RowStyled";
import SearchOption from "../../../interfaces/SearchOptions.js";

type Props = {
  elem: any;
  props: SearchOption[];
  selected: string;
  onExpand: (() => React.ReactElement) | (() => null);
};

export default function Row({
  elem,
  props,
  selected,
  onExpand = () => <></>,
}: Props) {
  return (
    <S.RowContainer $selected={selected}>
      <S.Cells>
        {props.map((option: SearchOption, i: number) => (
          <S.Cell key={i}>{elem[option.propName]}</S.Cell>
        ))}
      </S.Cells>
      {onExpand()}
    </S.RowContainer>
  );
}
