import { toast } from "react-toastify";
import ModalContainer from "./common/ModalContainer";
import * as S from "./common/ModalStyled";
import { useForm } from "react-hook-form";
import { getCurrentTime } from "@/utils/time";
import { postStudy } from "@/api/actionApi";

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
  const { month, date, yoil } = getCurrentTime();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onBlur" });

  const submit = async (e: any) => {
    const toastId = toast.loading("제출 중...");
    try {
      await postStudy({ students: items, date: `${month}/${date}` });
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
      title={`${month}/${date}(${yoil}) 2자습 신청 ✏️`}
      handleModalClose={handleModalClose}
    >
      <S.Form
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="off"
      >
        <S.Fields disabled={isSubmitting}>
          <S.CheckboxArea>
            <S.Checkbox
              id="agreement"
              type="checkbox"
              value="yes"
              autoFocus
              $isError={errors.agreement ? true : false}
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
      </S.Form>
    </ModalContainer>
  );
}
