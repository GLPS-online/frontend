import "./Student.css";

export default function Student({ data }) {
  return (
    <div className="student">
      <div>{data.korName}</div>
      <div>{data.classNum}</div>
      <div>{data.roomNum}</div>
    </div>
  );
}
