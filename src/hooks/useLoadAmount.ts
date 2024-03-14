import { useEffect, useState } from "react";
import Person from "../interfaces/Person";

const LOAD = 30;

export default function useLoadAmount(data: Person[]) {
  const [loadAmount, setLoadAmount] = useState(LOAD);
  const [displayedData, setDisplayedData] = useState<Person[]>([]);

  useEffect(() => {
    const newDisplayedData = data.slice(
      0,
      data.length > loadAmount ? loadAmount : data.length
    );
    setDisplayedData(newDisplayedData);
  }, [data]);

  const increaseLoadAmount = () => {
    if (loadAmount >= data.length) {
      return;
    }
    setLoadAmount((prev) => {
      if (prev + LOAD >= data.length) {
        return data.length;
      }
      return prev + LOAD;
    });
  };

  const isThereMore = loadAmount < data.length;

  return { displayedData, increaseLoadAmount, isThereMore };
}
