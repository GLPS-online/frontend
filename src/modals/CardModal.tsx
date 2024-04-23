import ModalContainer from "./ModalContainer";
import * as S from "./ModalStyled";
import { useForm } from "react-hook-form";

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
        <S.Label htmlFor="reason">
          {action === "eop" ? "적발 사유" : "발급 사유"}
        </S.Label>
        <S.Textarea
          id="reason"
          placeholder="상세히 작성해 주세요"
          $isError={errors.reason ? true : false}
          {...register("reason", {
            required: true,
          })}
        />
        <S.Buttons>
          <S.Button onClick={handleModalClose}>취소</S.Button>
          <S.Button disabled={isSubmitting} $color={action}>
            제출
          </S.Button>
        </S.Buttons>
      </S.Container>
    </ModalContainer>
  );
}
