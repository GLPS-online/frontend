import { clubList } from "@/constants";
import * as S from "./ClubPageStyled"
import { useNavigate, useParams } from "react-router-dom";
import Navigator from "@/components/Navigator/Navigator";
import Nametag from "@/components/Nametag/Nametag";
import { useState } from "react";
import User from "@/interfaces/User";
import Spinner from "@/components/Spinner";

export default function ClubPage() {
  const navigate = useNavigate()
  const { clubName = clubList[0].value } = useParams();
  const { location: clubLocation, label: clubLabel} = clubList.find((club) => club.value === clubName) || {};
  const [isLoading, setIsLoading] = useState(false);
  const [clubPAs, setClubPAs] = useState<User[]>([]);
  const [data, setData] = useState<User[] | null>([]);

  return (
    <S.Container>
      <S.ClubSelect
        value={clubName}
        name="clubName"
        onChange={(e) =>
          navigate(`/club/${e.target.value}`, { replace: true })
        }
      >
        {clubList?.map((clubName, i) => (
          <option key={i} value={clubName.value}>
            {clubName.label}
          </option>
        ))}
      </S.ClubSelect>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <S.InformationRow>
            <S.InformationItem>
              지도교사: &nbsp;
              {clubPAs.map((PA, i) => ( <Nametag
                data={PA}
                displayDivision={false}
              />))}
             
            </S.InformationItem>
            <S.InformationItem>Office: {clubLocation}</S.InformationItem>
          </S.InformationRow>
          
        </>
      )}
      <Navigator />
    </S.Container>
  )
}