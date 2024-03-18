import { useState } from "react";
import Person from "../interfaces/Person";

export default function useCheckbox() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, val]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== val));
    }
  }
  function handleCheckAll(
    e: React.ChangeEvent<HTMLInputElement>,
    data: Person[]
  ) {
    if (e.target.checked) {
      data.forEach((elem) => setSelectedItems((prev) => [...prev, elem._id]));
    } else {
      setSelectedItems([]);
    }
  }
  function clearItems() {
    setSelectedItems([]);
  }

  return { selectedItems, clearItems, handleCheckAll, handleCheckboxChange };
}
