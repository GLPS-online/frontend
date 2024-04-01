import Table from "@/components/Table/Table";
import { fetchPtlas } from "@/api";

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
          propName: "role",
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
      onExpand={() => <div>expanded</div>}
    />
  );
}
