import ModalContainer from "./ModalContainer";
import * as S from "./ModalStyled";
import { useForm } from "react-hook-form";

interface Props {
  handleModalClose: () => void;
  clearItems: () => void;
  items: string[];
}

export default function ShuttleModal({
  handleModalClose,
  clearItems,
  items,
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
      alert("제출");
      handleModalClose();
      clearItems();
    } catch (err) {
      alert(err);
      handleModalClose();
    }
  };

  return (
    <ModalContainer
      title="목발 셔틀 신청 🚐"
      handleModalClose={handleModalClose}
    >
      <S.Container
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="off"
      >
        <S.Label htmlFor="etc">출발지</S.Label>
        <S.Select
          id="departure"
          defaultValue="default"
          $isError={errors.departure ? true : false}
          {...register("departure", {
            required: true,
            validate: (v) => v !== "default",
          })}
        >
          <option disabled id="default" value="default">
            -
          </option>
          <option id="덕고관" value={"덕고관"}>
            덕고관
          </option>
          <option id="영교/민교관" value={"영교/민교관"}>
            영교/민교관
          </option>
          <option id="다산/충무관" value={"다산/충무관"}>
            다산/충무관
          </option>
          <option disabled id="other" value="other">
            기타 장소는 HQ에 직접 문의
          </option>
        </S.Select>
        <S.Select
          id="destination"
          defaultValue="default"
          $isError={errors.destination ? true : false}
          {...register("destination", {
            required: true,
            validate: (v) => v !== "default",
          })}
        >
          <option disabled id="default" value="default">
            -
          </option>
          <option id="덕고관" value={"덕고관"}>
            덕고관
          </option>
          <option id="영교/민교관" value={"영교/민교관"}>
            영교/민교관
          </option>
          <option id="다산/충무관" value={"다산/충무관"}>
            다산/충무관
          </option>
          <option disabled id="other" value="other">
            기타 장소는 HQ에 직접 문의
          </option>
        </S.Select>
        <S.Label htmlFor="etc">기타 요청사항(선택)</S.Label>
        <S.Textarea
          id="etc"
          placeholder="운전자에게 전달할 정보"
          $isError={errors.etc ? true : false}
          {...register("etc", {
            required: false,
          })}
        />
        <S.Buttons>
          <S.Button onClick={handleModalClose}>취소</S.Button>
          <S.Button disabled={isSubmitting} $color={"shuttle"}>
            제출
          </S.Button>
        </S.Buttons>
      </S.Container>
    </ModalContainer>
  );
}
