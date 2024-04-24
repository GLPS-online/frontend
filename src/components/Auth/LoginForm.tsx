import { useForm } from "react-hook-form";
import * as S from "./FormStyled";
import { useState } from "react";
import { LoginFormValue } from "@/interfaces/Auth";

export default function LoginForm({
  handleLogin,
}: {
  handleLogin: (obj1: { email: string; password: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValue>({ mode: "onBlur" });
  const [revealPw, setRevealPw] = useState(false);

  return (
    <S.Container onSubmit={handleSubmit((data) => handleLogin(data))}>
      <S.Logo>로그인</S.Logo>
      <S.Field>
        <S.Label htmlFor="email">이메일</S.Label>
        <S.Input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          autoFocus
          $isError={errors.email ? true : false}
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
          placeholder="비밀번호를 입력해 주세요"
          $isError={errors.password ? true : false}
          {...register("password", {
            required: true,
          })}
        />
        <S.Reveal
          onClick={() => setRevealPw((prev) => !prev)}
          draggable={false}
          src={revealPw ? "/icons/hide.svg" : "/icons/reveal.svg"}
          alt="reveal"
        />
        {errors.password && (
          <S.ErrorText>{errors.password.message?.toString()}</S.ErrorText>
        )}
      </S.Field>
      <S.SubmitButton type="submit" disabled={isSubmitting}>
        로그인
      </S.SubmitButton>
    </S.Container>
  );
}
