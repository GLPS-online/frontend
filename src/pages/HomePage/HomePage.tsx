import { fetchStudents } from "@/api/studentApi";
import Spinner from "@/components/Spinner";
import StudentTable from "@/components/Table/StudentTable";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (error) return "An error has occurred: " + error.message;

  return <>{isLoading ? <Spinner /> : <StudentTable data={data} />}</>;
}
