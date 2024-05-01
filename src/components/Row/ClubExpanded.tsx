import { clubList } from "@/constants";
import * as S from "./ExpandedStyled";
import Student from "@/interfaces/Student";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateStudent } from "@/api/studentApi";
import { useQueryClient } from "@tanstack/react-query";

export default function ClubExpanded({ student }: { student: Student }) {
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      clubChoice1: student.clubChoice1,
      clubChoice2: student.clubChoice2,
      clubChoice3: student.clubChoice3,
    },
  });
  async function handleEdit() {
    if (student._id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        console.log(getValues());
        await updateStudent(student._id, getValues());
        await queryClient.invalidateQueries({ queryKey: ["clubstudents"] });
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      }
    }
    // await onEdit(student._id, getValues());
    setIsEdit(false);
  }
  return (
    <S.Container>
      <S.Form autoComplete="off" onClick={(e) => e.stopPropagation()}>
        <S.Fields disabled={!isEdit || isSubmitting}>
          <S.Cells>
            <S.Cell>
              <S.Label>1지망</S.Label>
              <S.ClubChoiceSelect
                id="clubChoice1"
                $isError={errors.clubChoice1 ? true : false}
                {...register("clubChoice1", {
                  required: true,
                  validate: (value) =>
                    value !== getValues("clubChoice2") &&
                    value !== getValues("clubChoice3"),
                })}
              >
                <option value="" />
                {clubList.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </S.ClubChoiceSelect>
            </S.Cell>
            <S.Cell>
              <S.Label>2지망</S.Label>
              <S.ClubChoiceSelect
                id="clubChoice2"
                $isError={errors.clubChoice2 ? true : false}
                {...register("clubChoice2", {
                  required: true,
                  validate: (value) =>
                    value !== getValues("clubChoice1") &&
                    value !== getValues("clubChoice3"),
                })}
              >
                <option value="" />
                {clubList.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </S.ClubChoiceSelect>
            </S.Cell>
            <S.Cell>
              <S.Label>3지망</S.Label>
              <S.ClubChoiceSelect
                id="clubChoice3"
                $isError={errors.clubChoice3 ? true : false}
                {...register("clubChoice3", {
                  required: true,
                  validate: (value) =>
                    value !== getValues("clubChoice1") &&
                    value !== getValues("clubChoice2"),
                })}
              >
                <option value="" />
                {clubList.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </S.ClubChoiceSelect>
            </S.Cell>
          </S.Cells>
        </S.Fields>
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
                setIsEdit(true);
              }}
            >
              수정
            </S.EditSaveButton>
          </S.ButtonsContainer>
        )}
      </S.Form>
    </S.Container>
  );
}
