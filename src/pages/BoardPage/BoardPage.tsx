import Spinner from "@/components/Spinner";
import * as S from "./BoardPageStyled";
import { useEffect, useState } from "react";
import { getCurrentTime } from "@/utils/time";
import {
  fetchCards,
  fetchEops,
  fetchShuttles,
  fetchStudies,
} from "@/api/actionApi";

export default function BoardPage() {
  const { month, date, yoil } = getCurrentTime();
  const [action, setAction] = useState("eop");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  async function handleFetchStudies() {
    try {
      setIsLoading(true);
      const newData = await fetchStudies(`${month}/${date}`);
      setData(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchShuttles() {
    try {
      setIsLoading(true);
      const newData = await fetchShuttles(`${month}/${date}`);
      setData(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchEops() {
    try {
      setIsLoading(true);
      const newData = await fetchEops();
      setData(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchCards() {
    try {
      setIsLoading(true);
      const newData = await fetchCards(action);
      setData(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    switch (action) {
      case "eop":
        handleFetchEops();
        break;
      case "green":
      case "yellow":
      case "red":
        handleFetchCards();
        break;
      case "shuttle":
        handleFetchShuttles();
        break;
      case "study":
        handleFetchStudies();
        break;
      default:
        break;
    }
  }, [action]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          <option value={"green"}>그린카드 🟩</option>
          <option value={"yellow"}>옐로카드 🟨</option>
          <option value={"red"}>레드카드 🟥</option>
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
              case "green":
              case "yellow":
              case "red":
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
