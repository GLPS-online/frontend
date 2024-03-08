import Table from "../common/Table/Table";
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
          propName: "className",
          type: "string",
          placeholder: "학급",
          realType: "string",
        },
        {
          propName: "roomNum",
          type: "number", // 검색 시 입력 타입
          placeholder: "방",
          realType: "string",
        },
      ]}
      onExpand={() => {
        return <div>확장됨</div>;
      }}
    />
  );
}
