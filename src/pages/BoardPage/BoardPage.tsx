import Spinner from "@/components/Spinner";
import * as S from "./BoardPageStyled";
import { useEffect, useState } from "react";
import { getCurrentTime } from "@/utils/time";

export default function BoardPage() {
  const { month, date, yoil } = getCurrentTime();
  const [action, setAction] = useState("eop");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    switch (action) {
      case "eop":
        console.log("fetch eop");
        break;
      case "card":
        console.log("fetch card");
        break;
      case "shuttle":
        console.log("fetch shuttle of the day");
        break;
      case "study":
        console.log("fetch card of the day");
        break;
      default:
        break;
    }
  }, [action]);

  return (
    <>
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
          <option value={"eop"}>EOP 🔤</option>
          <option value={"card"}>카드 🟩🟨🟥</option>
          <option value={"study"}>2자습 ✏️</option>
          <option value={"shuttle"}>목발셔틀 🚐</option>
        </S.ActionSelect>
        {isLoading ? (
          <Spinner />
        ) : (
          (() => {
            switch (action) {
              case "eop":
                return <h2>EOP</h2>;
              case "card":
                return <h2>카드</h2>;
              case "shuttle":
                return <h2>셔틀버스</h2>;
              case "study":
                return <h2>자습</h2>;
              default:
                return <></>;
            }
          })()
        )}
      </S.Container>
    </>
  );
}
