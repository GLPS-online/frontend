import "./Table.css";
import Row from "./Row";

export default function Table({ data = [] }) {
  return (
    <div>
      {data.map((elem) => (
        <Row key={elem.id} data={elem} />
      ))}
    </div>
  );
}
