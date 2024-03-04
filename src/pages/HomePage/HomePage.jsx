import PtlaTable from "../../components/Table/PtlaTable";
import StudentTable from "../../components/Table/StudentTable";
import { useState } from "react";
import * as S from "./HomePageStyled";

export default function HomePage() {
  const [dataset, setDataset] = useState(true);
  return (
    <>
      <S.TableSelectorContainer>
        <S.TableSelectorButton
          onClick={() => {
            setDataset(true);
          }}
        >
          학생 정보
        </S.TableSelectorButton>
        <S.TableSelectorButton
          onClick={() => {
            setDataset(false);
          }}
        >
          PA/TA/LA 정보
        </S.TableSelectorButton>
      </S.TableSelectorContainer>
      {dataset ? <StudentTable /> : <PtlaTable />}
    </>
  );
}
