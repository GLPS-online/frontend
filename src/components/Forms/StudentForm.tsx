import { useState } from "react";
import { isBirthday } from "@/utils/etc";
import Student from "@/interfaces/Student";
import * as S from "./FormStyled";
import { useAuth } from "@/contexts/AuthProvider";
import { classList, clubList } from "@/constants";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function StudentForm({
  student,
  onEdit,
}: {
  student: Student;
  onEdit: (arg0: string, arg1: Object) => void;
}) {
  const { getUser } = useAuth();
  const isAdmin = getUser()?.admin > 0;
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      korName: student.korName,
      status: student.status,
      className: student.className,
      roomNum: student.roomNum,
      club: student.club,
      sibling: student.sibling,
    },
  });

  async function handleEdit() {
    await onEdit(student._id, getValues());
    setIsEdit(false);
  }
  return (
    <>
    <S.InfoContainer>
      <S.Container autoComplete="off">
        <S.Fields disabled={isSubmitting}>
          <S.Field>
            <S.Label>이름</S.Label>
            {isEdit ? (
              <S.Input
                id="korName"
                type="text"
                placeholder={student.korName}
                $isError={errors.korName ? true : false}
                {...register("korName", {
                  required: true,
                })}
              />
            ) : (
              <S.Data>{student.korName}</S.Data>
            )}
          </S.Field>
          <S.Field>
            <S.Label>상태</S.Label>
            {isEdit ? (
              <S.Select
                id="status"
                $isError={errors.status ? true : false}
                {...register("status", {
                  required: true,
                })}
              >
                <option id="active" value="active">
                  재적
                </option>
                <option id="absent" value="absent">
                  임시귀가
                </option>
                <option id="discharged" value="discharged">
                  퇴소
                </option>
              </S.Select>
            ) : (
              <S.Data>{student.status}</S.Data>
            )}
          </S.Field>
          <S.Field>
            <S.Label>학급</S.Label>
            {isEdit ? (
              <S.Select
                id="className"
                $isError={errors.className ? true : false}
                {...register("className", {
                  required: true,
                  validate: (v)=>classList.includes(v),
                })}
              >
               {classList?.map((className, i) => (
                  <option key={i} id={className} value={className}>
                    {className} 반
                  </option>
                ))}
              </S.Select>
            ) : (
              <S.Data>{student.className}</S.Data>
            )}
          </S.Field>

          <S.Field>
            <S.Label>기숙사 호실</S.Label>
            {isEdit ? (
              <>
                <S.Input
                  id="roomNum"
                  type="number"
                  inputMode="numeric"
                  placeholder={student.roomNum.toString()}
                  $isError={errors.roomNum ? true : false}
                  {...register("roomNum", {
                    required: true,
                    min: {
                      value: 100,
                      message: "올바른 숫자를 입력해 주세요.",
                    },
                    max: {
                      value: 1100,
                      message: "올바른 숫자를 입력해 주세요.",
                    },
                  })}
                />
                {errors.roomNum && (
                  <S.ErrorText>
                    {errors.roomNum.message?.toString()}
                  </S.ErrorText>
                )}
              </>
            ) : (
              <S.Data>{student.roomNum}</S.Data>
            )}
          </S.Field>
          <S.Field>
            <S.Label>형제자매</S.Label>
            {isEdit ? (
              <>
                <S.Input
                  id="sibling"
                  type="text"
                  placeholder="이름을 정확히 입력하세요"
                  $isError={errors.sibling ? true : false}
                  {...register("sibling", {
                    required: true,
                  })}
                />
              </>
            ) : (
              <S.Data>
                {
                  student.sibling ?
                  <S.Phone>
                    <Link to={"/?korName="+student.sibling}>
                      {student.sibling}
                    </Link>
                  </S.Phone>
                  :
                  <></>
                }
              </S.Data>
            )}
          </S.Field>
          <S.Field>
            <S.Label>동아리</S.Label>
            {isEdit ? (
              <S.Select
                id="club"
                $isError={errors.club ? true : false}
                {...register("club", {
                  validate: (v)=> !v || clubList.includes(v),
                })}
              >
                <option value="-" />
                {clubList?.map((club, i) => (
                  <option key={i} id={club} value={club}>
                    {club}
                  </option>
                ))}
              </S.Select>
            ) : (
              <S.Data>{student.club}</S.Data>
            )}
          </S.Field>
        <S.Field>
          <S.Label>학적</S.Label>
          <S.ReadOnlyData>{student.school + " " + student.grade + "학년"}</S.ReadOnlyData>
        </S.Field>
        <S.Field>
          <S.Label>생년월일</S.Label>
          <S.ReadOnlyData>{student.birthDate + (isBirthday(student.birthDate)?"🎂":"")}</S.ReadOnlyData>
        </S.Field>
        <S.Field>
          <S.Label>알레르기</S.Label>
          <S.ReadOnlyData>{student.allergy}</S.ReadOnlyData>
        </S.Field>
        <S.Field>
          <S.Label>상의 사이즈</S.Label>
          <S.ReadOnlyData>{student.shirtSize}</S.ReadOnlyData>
        </S.Field>
      </S.Fields>
      <S.Field>
        <S.Label>자택 주소</S.Label>
        <S.ReadOnlyData>{student.address + " (" + student.postNum + ")"}</S.ReadOnlyData>
      </S.Field>
      <S.Field>
        <S.Label>보호자 연락처</S.Label>
        <S.ReadOnlyData>{student.parent1Relation + ": " + student.parent1Phone}</S.ReadOnlyData>
        {student.parent2Relation &&
          <S.ReadOnlyData>{ student.parent2Relation + ": " + student.parent2Phone}</S.ReadOnlyData>
        }
      </S.Field>
      {isEdit ? (
          <S.ButtonsContainer>
            <S.CancelButton
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setIsEdit(false);
              }}
            >
              취소
            </S.CancelButton>
            <S.EditSaveButton
              disabled={isSubmitting}
              onClick={handleSubmit(handleEdit)}
            >
              저장
            </S.EditSaveButton>
          </S.ButtonsContainer>
        ) : (
          <S.ButtonsContainer>
            <S.EditSaveButton
              onClick={() => {
                if (isAdmin) {
                  setIsEdit(true);
                } else {
                  toast.error("권한이 없습니다");
                }
              }}
            >
              수정
            </S.EditSaveButton>
          </S.ButtonsContainer>
        )}
      </S.Container>
    </S.InfoContainer>
  </>
  );
}
