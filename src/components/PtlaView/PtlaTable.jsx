import Table from "../common/Table/Table";
import { fetchPtlas } from "../../api";

export default function PtlaTable() {
  return (
    <Table
      fetchFunction={fetchPtlas}
      searchOptions={[
        {
          propName: "korName",
          type: "string",
          placeholder: "이름",
          realType: "string",
        },
        {
          propName: "role",
          type: "string",
          placeholder: "역할",
          realType: "string",
        },
        {
          propName: "roomNum",
          type: "number",
          placeholder: "방",
          realType: "string",
        },
      ]}
    />
  );
}
