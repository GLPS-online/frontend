import { toast } from "react-toastify";
import ModalContainer from "./ModalContainer";
import * as S from "./ModalStyled";
import { useForm } from "react-hook-form";

interface Props {
  handleModalClose: () => void;
  items: string[];
  onSuccess: () => void;
}

export default function StudyModal({
  handleModalClose,
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
      // await fetchStudent("660bd0ae117db220f6d65ab7");
      onSuccess();
      handleModalClose();
      toast.update(toastId, {
        render: "제출 완료👌",
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
  };

  return (
    <ModalContainer title="2자습 신청 ✏️" handleModalClose={handleModalClose}>
      <S.Container
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="off"
      >
        <S.Fields disabled={isSubmitting}>
          <S.CheckboxArea $isError={errors.agreement ? true : false}>
            <S.Checkbox
              id="agreement"
              type="checkbox"
              value="yes"
              autoFocus
              {...register("agreement", { required: true })}
            />
            <S.ConfirmText htmlFor="agreement">
              2자습 관련 안내사항을 <br />
              학생{items.length > 1 ? "들" : ""}에게 전달했습니다.
            </S.ConfirmText>
          </S.CheckboxArea>
          <S.Buttons>
            <S.Button onClick={handleModalClose}>취소</S.Button>
            <S.Button $color="study">제출</S.Button>
          </S.Buttons>
        </S.Fields>
      </S.Container>
    </ModalContainer>
  );
}
