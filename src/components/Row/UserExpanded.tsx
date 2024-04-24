import User from "@/interfaces/User";
import { useNavigate } from "react-router-dom";
import * as S from "./ExpandedStyled";

export default function UserExpanded({ user }: { user: User }) {
  const navigate = useNavigate();
  return (
    <div>
      <S.Container>
        <S.Links>
          <S.Link
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${user._id}/`);
            }}
          >
            상세보기/정보수정
          </S.Link>
        </S.Links>
      </S.Container>
    </div>
  );
}
