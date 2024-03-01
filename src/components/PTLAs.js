import { fetchPtlas } from "../api";
import { useEffect, useState } from "react";

const LOAD = 30;

export default function PTLAs() {
  const [rawItems, setRawItems] = useState([]);
  const [loadAmount, setLoadAmount] = useState(LOAD);
  const [nameSearch, setNameSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");

  const items = rawItems.filter((item) => {
    return (
      item.korName.includes(nameSearch) &&
      item.roomNum.toString().includes(roomSearch) &&
      item.role.toString().includes(roleSearch)
    );
  });

  const displayedItems = items.slice(
    0,
    items.length > loadAmount ? loadAmount : items.length
  );

  async function getStudetns() {
    try {
      const res = await fetchPtlas();
      setRawItems(res);
    } catch (e) {
      alert(e);
      return;
    }
  }

  function refreshData() {
    getStudetns();
    setLoadAmount(LOAD);
  }

  function increaseLoadAmount() {
    if (loadAmount >= items.length) {
      return;
    }
    setLoadAmount((prev) => {
      if (prev + LOAD >= items.length) {
        return items.length;
      }
      return prev + LOAD;
    });
  }

  useEffect(() => {
    getStudetns();
  }, []);

  return <div className="students">hi</div>;
}
