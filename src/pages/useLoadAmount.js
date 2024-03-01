import { useState } from "react";

const LOAD = 30;
export default function useLoadAmount(data) {
  const [loadAmount, setLoadAmount] = useState(LOAD);

  const displayedData = data.slice(
    0,
    data.length > loadAmount ? loadAmount : data.length
  );
  const resetLoadAmount = () => {
    setLoadAmount(LOAD);
  };

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

  const isThereMore = () => {
    return loadAmount < data.length;
  };

  return [displayedData, resetLoadAmount, increaseLoadAmount, isThereMore];
}
