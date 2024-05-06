import Spinner from "@/components/Spinner";
import { getCurrentTime } from "@/utils/time";
import { fetchShuttles } from "@/api/actionApi";
import ShuttleTable from "@/components/Table/ShuttleTable";
import { useQuery } from "@tanstack/react-query";

export default function ShuttlePage() {
  const { month, date, yoil } = getCurrentTime();
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["shuttles"],
    queryFn: () => fetchShuttles(`${month}/${date}`),
    refetchOnWindowFocus: true,
  });
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1
        style={{ alignSelf: "flex-start" }}
      >{`목발셔틀 🚐 ${` - ${month}/${date}(${yoil})`}`}</h1>
      {isLoading ? <Spinner /> : <ShuttleTable data={data} />}
    </>
  );
}
