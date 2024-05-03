import { toast } from "react-toastify";
import ModalContainer from "./ModalContainer";
import * as S from "./ModalStyled";
import { useForm } from "react-hook-form";
import { getCurrentTime } from "@/utils/time";
import { useEffect } from "react";
import { postShuttle } from "@/api/actionApi";

interface Props {
  handleModalClose: () => void;
  onSuccess: () => void;
  items: string[];
}

export default function ShuttleModal({
  handleModalClose,
  onSuccess,
  items,
}: Props) {
  const { month, date, yoil } = getCurrentTime();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onBlur" });

  const watchTime = watch("time");
  useEffect(() => {
    if (
      watchTime === "오전등교" ||
      watchTime === "오후등교" ||
      watchTime === "자습수업"
    ) {
      setValue("departure", "덕고관");
      setValue("destination", "default");
    } else {
      setValue("departure", "default");
      setValue("destination", "default");
    }
  }, [watchTime, setValue]);

  const submit = async (e: any) => {
    const toastId = toast.loading("제출 중...");
    try {
      await postShuttle({
        students: items,
        date: `${month}/${date}`,
        time: e.time,
        departure: e.departure,
        destination: e.destination,
      });
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
      title={`${month}/${date}(${yoil}) 목발 셔틀 신청 🚐`}
      handleModalClose={handleModalClose}
    >
      <S.Container
        onSubmit={handleSubmit((data) => submit(data))}
        autoComplete="off"
      >
        <S.Fields disabled={isSubmitting}>
          <S.Label>시각</S.Label>
          <S.Select
            id="time"
            defaultValue="default"
            autoFocus
            $isError={errors.time ? true : false}
            {...register("time", {
              required: true,
              validate: (v) => v !== "default",
            })}
          >
            <option disabled id="default" value="default">
              -
            </option>
            <option id="오전등교" value={"오전등교"}>
              오전등교
            </option>
            <option id="2 ➔ 3 교시" value={"2 ➔ 3 교시"}>
              2 ➔ 3 교시
            </option>
            <option id="오후등교" value={"오후등교"}>
              오후등교
            </option>
            <option id="6 ➔ 7 교시" value={"6 ➔ 7 교시"}>
              6 ➔ 7 교시
            </option>
            <option id="자습수업" value={"자습수업"}>
              자습수업
            </option>
          </S.Select>
          <S.Label>출발지</S.Label>
          <S.Select
            id="departure"
            defaultValue="default"
            disabled={
              watchTime === "오전등교" ||
              watchTime === "오후등교" ||
              watchTime === "자습수업"
            }
            $isError={errors.departure ? true : false}
            {...register("departure", {
              required: true,
              validate: (v) => v !== "default",
            })}
          >
            <option disabled id="default" value="default">
              -
            </option>
            {(watchTime === "오전등교" ||
              watchTime === "오후등교" ||
              watchTime === "자습수업") && (
              <option id="덕고관" value={"덕고관"}>
                덕고관
              </option>
            )}
            <option id="영교/민교관" value={"영교/민교관"}>
              영교/민교관
            </option>
            <option id="다산/충무관" value={"다산/충무관"}>
              다산/충무관
            </option>
            <option id="체육관" value={"체육관"}>
              체육관
            </option>
            <option id="국궁장" value={"국궁장"}>
              국궁장
            </option>
          </S.Select>

          <S.Label>목적지</S.Label>
          <S.Select
            id="destination"
            defaultValue="default"
            disabled={watchTime === "오전하교" || watchTime === "오후하교"}
            $isError={errors.destination ? true : false}
            {...register("destination", {
              required: true,
              validate: (v) => v !== "default",
            })}
          >
            <option disabled id="default" value="default">
              -
            </option>
            <option id="영교/민교관" value={"영교/민교관"}>
              영교/민교관
            </option>
            <option id="다산/충무관" value={"다산/충무관"}>
              다산/충무관
            </option>
            {watchTime !== "6 ➔ 7 교시" && watchTime !== "자습수업" && (
              <>
                <option id="체육관" value={"체육관"}>
                  체육관
                </option>
                <option id="국궁장" value={"국궁장"}>
                  국궁장
                </option>
              </>
            )}
          </S.Select>
          <S.Label
            style={{
              alignSelf: "center",
              fontSize: "15px",
              color: "gray",
              marginBottom: "10px",
            }}
          >
            기타 요청사항은 HQ에 직접 문의
          </S.Label>
          {/* <S.Textarea
            id="etc"
            placeholder="운전자에게 전달할 정보"
            $isError={errors.etc ? true : false}
            {...register("etc", {
              required: false,
            })}
          /> */}
          <S.Buttons>
            <S.Button onClick={handleModalClose}>취소</S.Button>
            <S.Button $color={"shuttle"}>제출</S.Button>
          </S.Buttons>
        </S.Fields>
      </S.Container>
    </ModalContainer>
  );
}
