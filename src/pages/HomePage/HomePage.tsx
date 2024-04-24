import { fetchStudents } from "@/api/studentApi";
import StudentTable from "@/components/Table/StudentTable";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { error, data } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    initialData: [],
  });

  if (error) return "An error has occurred: " + error.message;

  return <StudentTable data={data} />;
}
