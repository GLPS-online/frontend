import "./Row.css";

export default function Row({ data }) {
  return (
    <div className="row">
      <div>{data.korName}</div>
      <div>{data.classNum}</div>
      <div>{data.roomNum}</div>
    </div>
  );
}
