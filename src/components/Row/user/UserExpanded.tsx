import User from "@/interfaces/User";
import { useNavigate } from "react-router-dom";
import * as S from "../ExpandedStyled";

export default function UserExpanded({ user }: { user: User }) {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Links>
        <S.Link
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${user._id}`);
          }}
        >
          세부정보/수정
        </S.Link>
      </S.Links>
    </S.Container>
  );
}
