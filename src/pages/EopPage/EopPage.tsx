import Spinner from "@/components/Spinner";
import { fetchEops } from "@/api/actionApi";
import ShuttleTable from "@/components/Table/ShuttleTable";
import { useQuery } from "@tanstack/react-query";

export default function EopPage() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["eops"],
    queryFn: fetchEops,
    refetchOnWindowFocus: true,
  });
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1 style={{ alignSelf: "flex-start" }}>{"EOP 🔤"}</h1>
      {isLoading ? <Spinner /> : <ShuttleTable data={data} />}

      {/* 발급시각, 이름, 통과여부(X 혹은 V) 확장 시 적발자네임태그/검사자네임태그 사유와 취소버튼*/}
    </>
  );
}
