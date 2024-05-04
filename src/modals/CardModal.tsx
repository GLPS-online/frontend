import { toast } from "react-toastify";
import ModalContainer from "./ModalContainer";
import * as S from "./ModalStyled";
import { useForm } from "react-hook-form";
import { postCard, postEop } from "@/api/actionApi";

interface Props {
  handleModalClose: () => void;
  action: string;
  items: string[];
  onSuccess: () => void;
}

export default function CardModal({
  handleModalClose,
  action,
  items,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onBlur" });

  const submit = async (e: any) => {
    const toastId = toast.loading("제출 중...");
    try {
      if (action === "eop") {
        await postEop({ students: items, note: e.note });
      } else if (
        action === "red" ||
        action === "yellow" ||
        action === "green"
      ) {
        await postCard({ students: items, type: action, note: e.note });
      } else {
        throw new Error("오류. 관리자문의");
      }
      toast.update(toastId, {
        render: "제출 완료👌",
        type: "success",
        autoClose: 2500,
        isLoading: false,
      });
      onSuccess();
      handleModalClose();
    } catch (err: any) {
      toast.update(toastId, {
        render: `${err.response?.data.msg}`,
        type: "error",
        autoClose: 2500,
        isLoading: false,
      });
    }
  };

  return (
    <ModalContainer
      title={(() => {
        switch (action) {
          case "red":
            return "레드카드 발급 🟥";
          case "yellow":
            return "옐로카드 발급 🟨";
          case "green":
            return "그린카드 발급 🟩";
          case "eop":
            return "EOP 적발 🔤";
        }
        return "오류. 관리자문의";
      })()}
      handleModalClose={handleModalClose}
    >
      <S.Container
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="off"
      >
        <S.Fields disabled={isSubmitting}>
          <S.Label>{action === "eop" ? "적발 사유" : "발급 사유"}</S.Label>
          <S.Textarea
            id="note"
            autoFocus
            placeholder="상세히 작성해 주세요"
            $isError={errors.note ? true : false}
            {...register("note", {
              required: true,
            })}
          />
          <S.Buttons>
            <S.Button onClick={handleModalClose}>취소</S.Button>
            <S.Button $color={action}>제출</S.Button>
          </S.Buttons>
        </S.Fields>
      </S.Container>
    </ModalContainer>
  );
}
