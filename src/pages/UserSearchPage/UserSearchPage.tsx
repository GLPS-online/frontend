import { fetchUsers } from "@/api/userApi";
import UserTable from "@/components/Table/UserTable";
import { useQuery } from "@tanstack/react-query";

export default function UserSearchPage() {
  const { error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialData: [],
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1>P·T·LA 검색</h1>
      <UserTable data={data} />
    </>
  );
}
