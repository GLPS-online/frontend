import { useState } from "react";
import { getCourse } from "@/utils/etc";
import Student from "@/interfaces/Student";
import * as S from "./StudentPageStyled";
import { useAuth } from "@/contexts/AuthProvider";
import { classList } from "@/constants";

export default function EditableInfo({
  student,
  onEdit,
}: {
  student: Student;
  onEdit: (arg0: Object) => void;
}) {
  const { getUser } = useAuth();
  const isEditable = getUser()?.admin > 0;
  const [isEdit, setIsEdit] = useState(false);

  const [values, setValues] = useState({
    korName: student.korName,
    status: student.status,
    className: student.className,
    roomNum: student.roomNum,
    club: student.club,
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
    // put call 보냄
    onEdit(values);
    setIsEdit(false);
  }
  return (
    <S.InfoContainer>
      {isEdit ? (
        <S.Button onClick={handleEdit}>
          <S.EditSave src="/icons/save.svg" draggable={false} />
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
          <S.EditSave src="/icons/edit.svg" draggable={false} />
        </S.Button>
      )}

      <div>
        이름:{" "}
        {isEdit ? (
          <input
            type="text"
            name="korName"
            value={values.korName}
            onChange={handleChange}
          />
        ) : (
          student.korName
        )}
      </div>
      <div>
        버튼 2개: 귀가처리 / 귀교처리 / 퇴소처리 하기 상태:{" "}
        {isEdit ? (
          <input
            type="text"
            name="status"
            value={values.status}
            onChange={handleChange}
          />
        ) : (
          student.status
        )}
      </div>
      <div>
        학급:{" "}
        {isEdit ? (
          <select
            value={values.className}
            name="className"
            onChange={handleChange}
          >
            {classList?.map((className, i) => (
              <option key={i} value={className}>
                {className} 반
              </option>
            ))}
          </select>
        ) : (
          student.className +
          "반 " +
          getCourse(student.grade, student.className)
        )}
      </div>
      <div>
        방:{" "}
        {isEdit ? (
          <input
            type="text"
            name="roomNum"
            value={values.roomNum}
            onChange={handleChange}
          />
        ) : (
          student.roomNum
        )}
      </div>
      <div>동아리: </div>
    </S.InfoContainer>
  );
}
