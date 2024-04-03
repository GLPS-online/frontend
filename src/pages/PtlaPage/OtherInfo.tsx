import Ptla from "@/interfaces/Ptla";
import * as S from "./PtlaPageStyled";

export default function OtherInfo({ Ptla }: { Ptla: Ptla }) {
  return (
    <S.InfoContainer>
      <div>
        {Ptla.korName} ({Ptla.engName})
      </div>
      <div>기수: {Ptla.wave}</div>
      <div>성별: {Ptla.gender}</div>
      <div>
        {"연락처: "}
        <a href={`tel:${Ptla.phone}`}>{Ptla.phone}</a>
      </div>
      <hr />
    </S.InfoContainer>
  );
}
