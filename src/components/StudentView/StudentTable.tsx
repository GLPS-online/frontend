import Table from "../common/Table/Table";
import { fetchStudents } from "../../api";
import StudentExpanded from "./StudentExpanded";

export default function StudentTable() {
  return (
    <Table
      fetchFunction={fetchStudents}
      searchOptions={[
        {
          propName: "korName",
          inputType: "string",
          placeholder: "이름",
          searchType: "string",
        },
        {
          propName: "className",
          inputType: "string",
          placeholder: "학급",
          searchType: "string",
        },
        {
          propName: "roomNum",
          inputType: "number", // 검색 시 입력 타입
          placeholder: "방",
          searchType: "number",
        },
      ]}
      // @ts-expect-error
      onExpand={(elem) => <StudentExpanded student={elem} />}
    />
  );
}
