import { fetchStudents } from "@/api/api";
import Table from "@/components/Table/Table";
import StudentExpanded from "./StudentExpanded";

export default function HomePage() {
  return (
    <>
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
            searchType: "string",
          },
        ]}
        selectable={true}
        // @ts-expect-error
        onExpand={(elem) => <StudentExpanded student={elem} />}
      />
    </>
  );
}
