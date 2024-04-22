import Table from "@/components/Table/Table";
import { fetchUsers } from "@/api/userApi";
import { Link } from "react-router-dom";

export default function UserSearchPage() {
  return (
    <>
      <h1>P·T·LA 검색</h1>
      <Table
        fetchFunction={fetchUsers}
        searchOptions={[
          {
            propName: "korName",
            inputType: "string",
            placeholder: "이름",
            searchType: "string",
          },
          {
            propName: "position",
            inputType: "string",
            placeholder: "직책",
            searchType: "string",
          },
          {
            propName: "roomNum",
            inputType: "number",
            placeholder: "방",
            searchType: "string",
          },
        ]}
        onExpand={(elem) => (
          <div>
            <Link to={`/user/${elem._id}`}>자세히;</Link>
          </div>
        )}
      />
    </>
  );
}
