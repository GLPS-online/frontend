import Ptla from "@/interfaces/Ptla";
import * as S from "./PtlaPageStyled";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export default function AdminInfo({
  Ptla,
  onEdit,
}: {
  Ptla: Ptla;
  onEdit: (arg0: string, arg1: object) => void;
}) {
  const { getUser } = useAuth();
  const isEditable = getUser()?.admin > 0;
  const isPowerAdmin = getUser()?.admin > 1;
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    division: Ptla.division,
    position: Ptla.position,
    area: Ptla.area,
  });
  function handleEdit() {
    setIsEdit(false);
    onEdit(Ptla._id, values);
  }
  return (
    <S.InfoContainer>
      {isEdit ? (
        <S.Button onClick={handleEdit}>
          <S.SaveButton />
        </S.Button>
      ) : (
        <S.Button
          onClick={() => {
            if (isEditable) {
              setIsEdit(true);
            } else {
              alert("관리자 문의");
            }
          }}
        >
          <S.EditButton />
        </S.Button>
      )}
      <div>부서: {Ptla?.division}</div>
      <div>직책: {Ptla?.position}</div>
      <div>구역: {Ptla?.area}</div>
      {isPowerAdmin && (
        <>
          <button onClick={() => {}}>관리자 권한 부여</button>
          <button onClick={() => {}}>해당 유저 삭제</button>
        </>
      )}
    </S.InfoContainer>
  );
}
