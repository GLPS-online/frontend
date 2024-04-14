import { useForm } from "react-hook-form";
import styles from "./Forms.module.css";
import RevealSvg from "@/assets/icons/reveal.svg";
import HideSvg from "@/assets/icons/hide.svg";
import { useEffect, useState } from "react";
import {
  HQpositions,
  LApositions,
  PApositions,
  TApositions,
  classRooms,
} from "@/constants/signup";

export default function LoginForm({
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
    <form
      className={styles.container}
      autoComplete="off"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          type="email"
          autoCapitalize="none"
          autoComplete="off"
          className={`${styles.input} + ${errors.email ? styles.isError : ""}`}
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
          <span className={styles.error}>
            {errors.email.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          type={revealPw ? "text" : "password"}
          placeholder="••••••••"
          autoCapitalize="none"
          className={`${styles.input} + ${
            errors.password ? styles.isError : ""
          }`}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
          })}
        />
        <img
          onClick={() => setRevealPw((prev) => !prev)}
          src={revealPw ? HideSvg : RevealSvg}
          alt="reveal"
          className={styles.reveal}
        />
        {errors.password && (
          <span className={styles.error}>
            {errors.password.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="confirmPassword">
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          type={revealConfirmPw ? "text" : "password"}
          placeholder="••••••••"
          className={`${styles.input} + ${
            errors.confirmPassword ? styles.isError : ""
          }`}
          {...register("confirmPassword", {
            required: true,
            validate: (v) =>
              v === getValues("password") || "비밀번호가 일치하지 않습니다.",
          })}
        />
        <img
          onClick={() => setRevealConfirmPw((prev) => !prev)}
          src={revealConfirmPw ? HideSvg : RevealSvg}
          alt="reveal"
          className={styles.reveal}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>
            {errors.confirmPassword.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="korName">
          이름
        </label>
        <input
          id="korName"
          type="text"
          className={`${styles.input} + ${
            errors.korName ? styles.isError : ""
          }`}
          placeholder="홍길동"
          {...register("korName", {
            required: true,
            minLength: {
              value: 2,
              message: "2자 이상 입력해 주세요.",
            },
          })}
        />
        {errors.korName && (
          <span className={styles.error}>
            {errors.korName.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="engName">
          영문 이름
        </label>
        <input
          id="engName"
          type="text"
          className={`${styles.input} + ${
            errors.engName ? styles.isError : ""
          }`}
          placeholder="Gildong Hong"
          {...register("engName", {
            required: true,
            minLength: {
              value: 2,
              message: "2자 이상 입력해 주세요.",
            },
          })}
        />
        {errors.engName && (
          <span className={styles.error}>
            {errors.engName.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="wave">
          기수
        </label>
        <input
          id="wave"
          type="number"
          inputMode="decimal"
          className={`${styles.input} + ${errors.wave ? styles.isError : ""}`}
          placeholder="19 / 23.5 / 26 / .."
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
          <span className={styles.error}>
            {errors.wave.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="gender">
          생물학적 성
        </label>
        <select
          id="gender"
          defaultValue="default"
          className={`${styles.select} + ${
            errors.gender ? styles.isError : ""
          }`}
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
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="division">
          부서
        </label>
        <select
          id="division"
          defaultValue="default"
          className={`${styles.select} + ${
            errors.gender ? styles.isError : ""
          }`}
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
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="position">
          직책
        </label>
        <select
          id="position"
          disabled={watchDivision === "default"}
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
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="area">
          담당 교실(TA만 해당)
        </label>
        <select
          id="area"
          disabled={watchDivision !== "TA"}
          defaultValue={""}
          {...register("area", { required: false })}
        >
          <option id="default" value={""}>
            -
          </option>
          {classRooms.map((classRoom) => (
            <option key={classRoom} value={classRoom}>
              {classRoom}
            </option>
          ))}
        </select>
        {errors.roomNum && (
          <span className={styles.error}>
            {errors.roomNum.message?.toString()}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="roomNum">
          기숙사 호실
        </label>
        <input
          id="roomNum"
          type="number"
          inputMode="numeric"
          className={`${styles.input} + ${
            errors.roomNum ? styles.isError : ""
          }`}
          placeholder="1002"
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
          <span className={styles.error}>
            {errors.roomNum.message?.toString()}
          </span>
        )}
      </div>
      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        사용자 등록
      </button>
    </form>
  );
}
