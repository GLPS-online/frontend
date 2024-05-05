import Spinner from "@/components/Spinner";
import { getCurrentTime } from "@/utils/time";
import { fetchStudies } from "@/api/actionApi";
import ShuttleTable from "@/components/Table/ShuttleTable";
import { useQuery } from "@tanstack/react-query";

export default function StudyPage() {
  const { month, date, yoil } = getCurrentTime();
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["studies", month, date],
    queryFn: () => fetchStudies(`${month}/${date}`),
  });
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1
        style={{ alignSelf: "flex-start" }}
      >{`2자습 ✏️ ${` - ${month}/${date}(${yoil})`}`}</h1>
      {isLoading ? <Spinner /> : <ShuttleTable data={data} />}
    </>
  );
}
