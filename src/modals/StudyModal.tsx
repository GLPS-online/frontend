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
      alert(items.length + "액션");
      handleModalClose();
      onSuccess();
    } catch (err) {
      alert(err);
      handleModalClose();
    }
  };

  return (
    <ModalContainer title="2자습 신청 ✏️" handleModalClose={handleModalClose}>
      <S.Container
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="new-password"
      >
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
          <S.Button disabled={isSubmitting} $color="study">
            제출
          </S.Button>
        </S.Buttons>
      </S.Container>
    </ModalContainer>
  );
}
