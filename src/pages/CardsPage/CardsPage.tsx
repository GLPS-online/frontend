import Spinner from "@/components/Spinner";
import { fetchCards } from "@/api/actionApi";
import ShuttleTable from "@/components/Table/ShuttleTable";
import { useQuery } from "@tanstack/react-query";

export default function CardsPage() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    refetchOnWindowFocus: true,
  });
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1 style={{ alignSelf: "flex-start" }}>{"카드현황 🟩🟨🟥"}</h1>
      {isLoading ? <Spinner /> : <ShuttleTable data={data} />}
    </>
  );
}
