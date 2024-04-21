import User from "@/interfaces/User";
import * as S from "./UerPageStyled";

export default function OtherInfo({ User }: { User: User }) {
  return (
    <S.InfoContainer>
      <div>
        {User.korName} ({User.engName})
      </div>
      <div>기수: {User.wave}</div>
      <div>성별: {User.gender}</div>
      <div>
        {"연락처: "}
        <a href={`tel:${User.phone}`}>{User.phone}</a>
      </div>
      <hr />
    </S.InfoContainer>
  );
}
