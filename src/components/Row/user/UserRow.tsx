import * as S from "../RowStyled";
import UserExpanded from "./UserExpanded";

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
      {isExpanded && <UserExpanded user={user} />}
    </S.RowContainer>
  );
}
