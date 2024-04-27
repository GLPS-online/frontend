import { fetchUsers } from "@/api/userApi";
import Spinner from "@/components/Spinner";
import UserTable from "@/components/Table/UserTable";
import { useQuery } from "@tanstack/react-query";

export default function UserSearchPage() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: true,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1>P·T·LA 검색</h1>
      {isLoading ? <Spinner /> : <UserTable data={data} />}
    </>
  );
}
