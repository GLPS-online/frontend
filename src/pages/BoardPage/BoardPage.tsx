import Spinner from "@/components/Spinner";
import * as S from "./BoardPageStyled";
import { useState } from "react";
import { actions } from "@/constants";
import { getCurrentTime } from "@/utils/time";

export default function BoardPage() {
  const { month, date, yoil } = getCurrentTime();
  const [action, setAction] = useState("eop");

  return (
    <S.Container>
      <h1>{`현황판${
        action === "shuttle" || action === "study"
          ? ` - ${month}/${date}(${yoil})`
          : ""
      }`}</h1>
      <S.ActionSelect
        value={action}
        name="action"
        onChange={(e) => setAction(e.target.value)}
      >
        {actions.map((action) => (
          <option key={action.value} value={action.value}>
            {action.label}
          </option>
        ))}
      </S.ActionSelect>
    </S.Container>

    // <>
    //   <h1 style={{ alignSelf: "flex-start" }}>EOP/카드/현황판</h1>
    //   {isLoading ? <Spinner /> : <ClubTable data={data} />}
    // </>
  );
}
