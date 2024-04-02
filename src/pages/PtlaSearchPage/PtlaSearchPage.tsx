import Table from "@/components/Table/Table";
import { fetchPtlas } from "@/api";
import { Link } from "react-router-dom";

export default function PtlaSearchPage() {
  return (
    <Table
      fetchFunction={fetchPtlas}
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
          placeholder: "역할",
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
          <Link to={`/ptla/${elem._id}`}>자세히;</Link>
        </div>
      )}
    />
  );
}
