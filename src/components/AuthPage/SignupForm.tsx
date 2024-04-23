import { useForm } from "react-hook-form";
import * as S from "./FormStyled";
import { useEffect, useState } from "react";
import {
  HQpositions,
  LApositions,
  PApositions,
  TApositions,
  classRooms,
  floorList,
} from "@/constants";

export default function SignupForm({
  handleSignup,
}: {
  handleSignup: (arg0: object) => void;
}) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm({ mode: "onBlur" });
  const [revealPw, setRevealPw] = useState(false);
  const [revealConfirmPw, setRevealConfirmPw] = useState(false);
  const watchDivision = watch("division", "default");
  useEffect(() => {
    setValue("position", "default");
    setValue("area", "");
  }, [watchDivision, setValue]);
  return (
    <S.Container autoComplete="off" onSubmit={handleSubmit(handleSignup)}>
      <S.Field>
        <S.Label htmlFor="email">이메일</S.Label>
        <S.Input
          id="email"
          type="email"
          autoCapitalize="none"
          $isError={errors.email ? true : false}
          placeholder="gdhong@gmail.com"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
        />
        {errors.email && (
          <S.ErrorText>{errors.email.message?.toString()}</S.ErrorText>
        )}
      </S.Field>

      <S.Field>
        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          id="password"
          type={revealPw ? "text" : "password"}
          placeholder="••••••••"
          autoCapitalize="none"
          $isError={errors.password ? true : false}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
          })}
        />
        <S.Reveal
          onClick={() => setRevealPw((prev) => !prev)}
          src={revealPw ? "/icons/hide.svg" : "/icons/reveal.svg"}
          alt="reveal"
        />
        {errors.password && (
          <S.ErrorText>{errors.password.message?.toString()}</S.ErrorText>
        )}
      </S.Field>

      <S.Field>
        <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
        <S.Input
          id="confirmPassword"
          type={revealConfirmPw ? "text" : "password"}
          placeholder="••••••••"
          $isError={errors.confirmPassword ? true : false}
          {...register("confirmPassword", {
            required: true,
            validate: (v) =>
              v === getValues("password") || "비밀번호가 일치하지 않습니다.",
          })}
        />
        <S.Reveal
          onClick={() => setRevealConfirmPw((prev) => !prev)}
          src={revealConfirmPw ? "/icons/hide.svg" : "/icons/reveal.svg"}
          alt="reveal"
        />
        {errors.confirmPassword && (
          <S.ErrorText>
            {errors.confirmPassword.message?.toString()}
          </S.ErrorText>
        )}
      </S.Field>

      <S.Field>
        <S.Label htmlFor="korName">이름</S.Label>
        <S.Input
          id="korName"
          type="text"
          placeholder="홍길동"
          $isError={errors.korName ? true : false}
          {...register("korName", {
            required: true,
          })}
        />
      </S.Field>

      <S.Field>
        <S.Label htmlFor="engName">영문 이름</S.Label>
        <S.Input
          id="engName"
          type="text"
          placeholder="Gildong Hong"
          $isError={errors.engName ? true : false}
          {...register("engName", {
            required: true,
          })}
        />
      </S.Field>

      <S.Field>
        <S.Label htmlFor="wave">기수</S.Label>
        <S.Input
          id="wave"
          type="number"
          inputMode="decimal"
          placeholder="19 / 23.5 / 26 / .."
          $isError={errors.wave ? true : false}
          {...register("wave", {
            required: true,
            min: {
              value: 1,
              message: "올바른 기수를 입력해 주세요",
            },
            max: {
              value: 50,
              message: "올바른 기수를 입력해 주세요",
            },
          })}
        />
        {errors.wave && (
          <S.ErrorText>{errors.wave.message?.toString()}</S.ErrorText>
        )}
      </S.Field>

      <S.Field>
        <S.Label htmlFor="gender">생물학적 성</S.Label>
        <S.Select
          id="gender"
          defaultValue="default"
          $isError={errors.gender ? true : false}
          {...register("gender", {
            required: true,
            validate: (v) => v === "F" || v === "M",
          })}
        >
          <option id="default" value="default">
            -
          </option>
          <option id="female" value={"F"}>
            여
          </option>
          <option id="male" value={"M"}>
            남
          </option>
        </S.Select>
      </S.Field>

      <S.Field>
        <S.Label htmlFor="division">부서</S.Label>
        <S.Select
          id="division"
          defaultValue="default"
          $isError={errors.division ? true : false}
          {...register("division", {
            required: true,
            validate: (v) => v !== "default",
          })}
        >
          <option disabled id="default" value="default">
            -
          </option>
          <option id="pa" value={"PA"}>
            PA
          </option>
          <option id="la" value={"LA"}>
            LA
          </option>
          <option id="ta" value={"TA"}>
            TA
          </option>
          <option id="hq" value={"HQ"}>
            운영위원회
          </option>
        </S.Select>
      </S.Field>

      <S.Field>
        <S.Label htmlFor="position">직책</S.Label>
        <S.Select
          id="position"
          disabled={watchDivision === "default"}
          $isError={errors.position ? true : false}
          {...register("position", { required: true })}
        >
          {(() => {
            switch (watchDivision) {
              case "PA":
                return PApositions.map((PAposition) => (
                  <option key={PAposition} value={PAposition}>
                    {PAposition}
                  </option>
                ));
              case "LA":
                return LApositions.map((LAposition) => (
                  <option key={LAposition} value={LAposition}>
                    {LAposition}
                  </option>
                ));
              case "TA":
                return TApositions.map((TAposition) => (
                  <option key={TAposition} value={TAposition}>
                    {TAposition}
                  </option>
                ));
              case "HQ":
                return HQpositions.map((HQposition) => (
                  <option key={HQposition} value={HQposition}>
                    {HQposition}
                  </option>
                ));
              default:
                return <></>;
            }
          })()}
        </S.Select>
      </S.Field>

      <S.Field>
        <S.Label htmlFor="area">담당 교실/층(TA·LA만 해당)</S.Label>
        <S.Select
          id="area"
          disabled={watchDivision !== "TA" && watchDivision !== "LA"}
          defaultValue={""}
          $isError={errors.area ? true : false}
          {...register("area", { required: false })}
        >
          <option id="default" value={""}>
            -
          </option>
          {(() => {
            switch (watchDivision) {
              case "LA":
                return floorList.map((floor) => (
                  <option key={floor} value={floor}>
                    기숙사 {floor}
                  </option>
                ));
              case "TA":
                return classRooms.map((classRoom) => (
                  <option key={classRoom} value={classRoom}>
                    {classRoom}
                  </option>
                ));
              default:
                return <></>;
            }
          })()}
        </S.Select>
      </S.Field>

      <S.Field>
        <S.Label htmlFor="roomNum">기숙사 호실</S.Label>
        <S.Input
          id="roomNum"
          type="number"
          inputMode="numeric"
          placeholder="1002"
          $isError={errors.roomNum ? true : false}
          {...register("roomNum", {
            required: true,
            min: {
              value: 100,
              message: "올바른 숫자를 입력해 주세요.",
            },
            max: {
              value: 1100,
              message: "올바른 숫자를 입력해 주세요.",
            },
          })}
        />
        {errors.roomNum && (
          <S.ErrorText>{errors.roomNum.message?.toString()}</S.ErrorText>
        )}
      </S.Field>

      <S.SubmitButton type="submit" disabled={isSubmitting}>
        사용자 등록
      </S.SubmitButton>
    </S.Container>
  );
}
