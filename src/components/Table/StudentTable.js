import Table from "../Table/Table";
import { fetchStudents } from "../../api";

export default function StudentTable() {
  return (
    <Table
      fetchFunction={fetchStudents}
      searchOptions={[
        {
          propName: "korName",
          type: "string",
          placeholder: "이름",
          realType: "string",
        },
        {
          propName: "classNum",
          type: "number",
          placeholder: "학급",
          realType: "number",
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
