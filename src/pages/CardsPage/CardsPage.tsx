import Spinner from "@/components/Spinner";
import { fetchCards } from "@/api/actionApi";
import { useQuery } from "@tanstack/react-query";
import CardTable from "@/components/Table/CardTable";

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
      <h1 style={{ alignSelf: "flex-start" }}>{"카드 발급 현황"}</h1>
      {isLoading ? <Spinner /> : <CardTable data={data} />}

      {/* 발급시각, 이름, 카드종류 확장시 적발자와 사유*/}
    </>
  );
}
