import { useState } from "react";
import Person from "@/interfaces/Person";

export default function useCheckbox() {
  const [selectedItems, setSelectedItems] = useState(new Set<string>());
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (e.target.checked) {
      setSelectedItems((prev) => new Set(prev.add(val)));
    } else {
      setSelectedItems((prev) => {
        prev.delete(val);
        return new Set(prev);
      });
    }
  }
  function handleCheckAll(e: any, data: Person[]) {
    if (e.target.checked) {
      setSelectedItems((prev) => {
        data.forEach((elem) => prev.add(elem._id));
        return new Set(prev);
      });
    } else {
      setSelectedItems(new Set());
    }
  }
  function clearItems() {
    setSelectedItems(new Set());
  }

  return { selectedItems, clearItems, handleCheckAll, handleCheckboxChange };
}
