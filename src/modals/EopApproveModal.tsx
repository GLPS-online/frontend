import { toast } from "react-toastify";
import ModalContainer from "./common/ModalContainer";
import * as S from "./common/ModalStyled";
import { useForm } from "react-hook-form";
import { approveEop } from "@/api/actionApi";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  handleModalClose: () => void;
  id: string;
}

export default function EopApproveModal({ handleModalClose, id }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onBlur" });
  const queryClient = useQueryClient();

  const submit = async (e: any) => {
    const toastId = toast.loading("제출 중...");
    try {
      await approveEop(id);
      await queryClient.invalidateQueries({ queryKey: ["eops"] });
      toast.update(toastId, {
        render: "EOP 통과👌",
        type: "success",
        autoClose: 2500,
        isLoading: false,
      });
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
    <ModalContainer title="EOP 검사 🔤" handleModalClose={handleModalClose}>
      <S.Form
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="off"
      >
        <S.Fields disabled={isSubmitting}>
          <S.CheckboxArea>
            <S.Checkbox
              id="valid"
              type="checkbox"
              value="yes"
              autoFocus
              $isError={errors.valid ? true : false}
              {...register("valid", { required: true })}
            />
            <S.ConfirmText htmlFor="valid">
              요일에 맞는 EOP 페이퍼를 암기했습니다
            </S.ConfirmText>
          </S.CheckboxArea>
          <S.CheckboxArea>
            <S.Checkbox
              id="memorized"
              type="checkbox"
              value="yes"
              autoFocus
              $isError={errors.memorized ? true : false}
              {...register("memorized", { required: true })}
            />
            <S.ConfirmText htmlFor="memorized">
              EOP 페이퍼의 내용을 모두 암기했습니다
            </S.ConfirmText>
          </S.CheckboxArea>
          <S.Buttons>
            <S.Button onClick={handleModalClose}>취소</S.Button>
            <S.Button $color="study">제출</S.Button>
          </S.Buttons>
        </S.Fields>
      </S.Form>
    </ModalContainer>
  );
}
