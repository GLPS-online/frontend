import { useState } from "react";
import Person from "../interfaces/Person";

export default function useCheckbox() {
  const [selectedItems, setSelectedItems] = useState(new Set<string>());
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (e.target.checked) {
      setSelectedItems((prev) => new Set(prev.add(val)));
      // setSelectedItems((prev) => prev.add(val));
      // selectedItems.add(val);
      // setSelectedItems((prev) => [...prev, val]);
    } else {
      setSelectedItems((prev) => {
        prev.delete(val);
        return new Set(prev);
      });
      // selectedItems.delete(val);
      // setSelectedItems((prev) => prev.filter((item) => item !== val));
    }
  }
  function handleCheckAll(e: any, data: Person[]) {
    if (e.target.checked) {
      setSelectedItems((prev) => {
        data.forEach(
          (elem) => prev.add(elem._id)
          // setSelectedItems((prev) => [...new Set([...prev, elem._id])])
        );
        return new Set(prev);
      });
    } else {
      setSelectedItems(new Set());
      // selectedItems.clear();
      // setSelectedItems([]);
    }
  }
  function clearItems() {
    setSelectedItems(new Set());
    // selectedItems.clear();
    // setSelectedItems([]);
  }

  return { selectedItems, clearItems, handleCheckAll, handleCheckboxChange };
}
