import { Link } from "react-router-dom";
import * as S from "./AuthRedirectorStyled";

export default function AuthPageRedirector({
  text,
  redirectText,
  redirectLink,
}: {
  text: string;
  redirectText: string;
  redirectLink: string;
}) {
  return (
    <S.Redirectors>
      {text + " "}
      <Link to={redirectLink}>
        <S.RedirectLink>{redirectText}</S.RedirectLink>
      </Link>
    </S.Redirectors>
  );
}
