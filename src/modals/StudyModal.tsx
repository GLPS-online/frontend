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
    // console.log(e);
    // await createColumn(e.title, dashboardId);
    // await queryClient.invalidateQueries({
    //   // queryKey: ["columns", dashboardId + ""],
    // });
    try {
      // await fetchStudent("sdf");
      toast(items.length + "액션");
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.msg);
    } finally {
      handleModalClose();
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
              type="checkbox"
              value="yes"
              {...register("agreement", { required: true })}
            />
            2자습 관련 안내사항을 <br />
            학생{items.length > 1 ? "들" : ""}에게 전달했습니다.
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
