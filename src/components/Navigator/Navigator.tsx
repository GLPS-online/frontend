import { useNavigate } from "react-router-dom";
import * as S from "./NavigatorStyled";
export default function Navigator() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Link onClick={() => navigate(-1)}>돌아가기</S.Link>
      <S.Link onClick={() => navigate("/")}>홈으로</S.Link>
    </S.Container>
  );
}
