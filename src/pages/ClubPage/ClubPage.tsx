import Spinner from "@/components/Spinner";
import { fetchClubStudents } from "@/api/clubAPI";
import ClubTable from "@/components/Table/ClubTable";
import { useQuery } from "@tanstack/react-query";

export default function ClubPage() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["clubstudents"],
    queryFn: fetchClubStudents,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1 style={{ alignSelf: "flex-start" }}>동아리/종교활동</h1>
      {isLoading ? <Spinner /> : <ClubTable data={data} />}
    </>
  );
}
