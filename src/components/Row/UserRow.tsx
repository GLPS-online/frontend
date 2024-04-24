import { Link } from "react-router-dom";
import * as S from "./RowStyled";

type Props = {
  user: any;
  isExpanded?: boolean;
};

const displayProps = ["korName", "position", "roomNum"];

export default function UserRow({ user, isExpanded = false }: Props) {
  return (
    <S.RowContainer>
      <S.Cells>
        {displayProps.map((option: string, i: number) => (
          <S.Cell key={i}>{user[option]}</S.Cell>
        ))}
      </S.Cells>
      {isExpanded && (
        <div>
          <Link to={`/user/${user._id}`}>자세히</Link>
        </div>
      )}
    </S.RowContainer>
  );
}
