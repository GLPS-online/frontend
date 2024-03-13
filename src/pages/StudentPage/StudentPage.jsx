import { useParams } from "react-router-dom";

export default function StudentPage() {
  const { id } = useParams();

  return (
    <>
      <div>{id}</div>
    </>
  );
}
