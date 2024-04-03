import Ptla from "@/interfaces/Ptla";
import * as S from "./PtlaPageStyled";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AdminInfo({
  Ptla,
  onEdit,
  onGrantAdmin,
  onDelete,
}: {
  Ptla: Ptla;
  onEdit: (arg0: string, arg1: object) => void;
  onGrantAdmin: (arg0: string) => void;
  onDelete: (arg0: string) => void;
}) {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const isEditable = getUser()?.admin > 0;
  const isPowerAdmin = getUser()?.admin > 1;
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    division: Ptla.division,
    position: Ptla.position,
    area: Ptla.area,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
      <div>
        부서:{" "}
        {isEdit ? (
          <input
            type="text"
            name="division"
            value={values.division}
            onChange={handleChange}
          />
        ) : (
          Ptla.division
        )}
      </div>
      <div>
        직책:{" "}
        {isEdit ? (
          <input
            type="text"
            name="position"
            value={values.position}
            onChange={handleChange}
          />
        ) : (
          Ptla.position
        )}
      </div>
      <div>
        구역:{" "}
        {isEdit ? (
          <input
            type="text"
            name="area"
            value={values.area}
            onChange={handleChange}
          />
        ) : (
          Ptla.area
        )}
      </div>

      <div>관리자 권한 수준[0-2]: {Ptla.admin}</div>
      {isPowerAdmin && (
        <>
          <button
            onClick={() => {
              onGrantAdmin(Ptla._id);
            }}
          >
            관리자 권한 부여
          </button>
          <button
            onClick={() => {
              if (window.confirm("정말 삭제합니까?")) {
                onDelete(Ptla._id);
                alert("삭제되었습니다.");
                navigate("/ptlas");
              }
            }}
          >
            해당 유저 삭제
          </button>
        </>
      )}
    </S.InfoContainer>
  );
}
