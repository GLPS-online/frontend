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
    </>
  );
}
