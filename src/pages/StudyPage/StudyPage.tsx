import Spinner from "@/components/Spinner";
import { getCurrentTime } from "@/utils/time";
import { fetchStudies } from "@/api/actionApi";
import { useQuery } from "@tanstack/react-query";
import StudyTable from "@/components/Table/StudyTable";

export default function StudyPage() {
  const { month, date, yoil } = getCurrentTime();
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["studies"],
    queryFn: () => fetchStudies(`${month}/${date}`),
  });
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1 style={{ alignSelf: "flex-start" }}>
        2자습 ✏️
        <span style={{ fontWeight: "500" }}>
          {" - "}
          {`${month}/${date}(${yoil})`}
        </span>
      </h1>

      {isLoading ? <Spinner /> : <StudyTable data={data} />}
      {/* 이름, 학급, 방, 확장시 -> 신청pa 네임태그, 삭제버튼 */}
    </>
  );
}
