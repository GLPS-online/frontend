import React, { useState } from "react";
import { toast } from "react-toastify";
import * as S from "../ExpandedStyled";
import Student from "@/interfaces/Student";
import { useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "@/api/studentApi";
export default function AdmissionExpanded({ student }: { student: Student }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();
  async function handleBunbok() {
    if (student._id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        setIsSubmitting(true);
        await updateStudent(student._id, { status: "pending" });
        await queryClient.invalidateQueries({ queryKey: ["admission"] });
        toast.update(toastId, {
          render: "미입소로 번복",
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
      } finally {
        setIsSubmitting(false);
      }
    }
  }
  async function handleIpso() {
    if (student._id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        setIsSubmitting(true);
        await updateStudent(student._id, { status: "active" });
        await queryClient.invalidateQueries({ queryKey: ["admission"] });
        toast.update(toastId, {
          render: "입소 처리 완료👌",
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
      } finally {
        setIsSubmitting(false);
      }
    }
  }
  return (
    <S.Container>
      <S.ButtonsContainer onClick={(e) => e.stopPropagation()}>
        {student.status === "active" ? (
          <S.CancelButton disabled={isSubmitting} onClick={handleBunbok}>
            미입소처리
          </S.CancelButton>
        ) : (
          <S.EditSaveButton disabled={isSubmitting} onClick={handleIpso}>
            입소처리 !
          </S.EditSaveButton>
        )}
      </S.ButtonsContainer>
    </S.Container>
  );
}
