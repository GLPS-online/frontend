import User from "@/interfaces/User";
import * as S from "./UserPageStyled";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  HQpositions,
  LApositions,
  PApositions,
  TApositions,
  classRooms,
  floorList,
} from "@/constants";
import { phoneNumberAutoFormat } from "@/utils/etc";

export default function UserForm({
  User,
  onEdit,
  onGrantAdmin,
  onDelete,
}: {
  User: User;
  onEdit: (arg0: string, arg1: object) => void;
  onGrantAdmin: (arg0: string) => void;
  onDelete: (arg0: string) => void;
}) {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const isAdmin = getUser()?.admin > 0;
  const isPowerAdmin = getUser()?.admin > 1;
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      korName: User.korName,
      wave: User.wave,
      gender: User.gender,
      phone: User.phone,
      division: User.division,
      position: User.position,
      area: User.area,
      roomNum: User.roomNum,
    },
  });
  const watchDivision = watch("division");
  useEffect(() => {
    if (getValues("division") !== User.division) {
      setValue("position", "default");
      setValue("area", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDivision]);

  function handleEdit() {
    onEdit(User._id, getValues());
    setIsEdit(false);
  }
  return (
    <S.InfoContainer>
      <S.Container autoComplete="off">
        <S.Field>
          <S.Label>이름</S.Label>
          {isEdit ? (
            <S.Input
              id="korName"
              type="text"
              placeholder={User.korName}
              $isError={errors.korName ? true : false}
              {...register("korName", {
                required: true,
              })}
            />
          ) : (
            <S.Data>{User.korName}</S.Data>
          )}
        </S.Field>
        <S.Field>
          <S.Label>기수</S.Label>
          {isEdit ? (
            <>
              <S.Input
                id="wave"
                type="number"
                inputMode="decimal"
                placeholder={User.wave.toString()}
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
            </>
          ) : (
            <S.Data>{User.wave}</S.Data>
          )}
        </S.Field>
        <S.Field>
          <S.Label>성별</S.Label>
          {isEdit ? (
            <S.Select
              id="gender"
              $isError={errors.gender ? true : false}
              {...register("gender", {
                required: true,
                validate: (v) => v === "F" || v === "M",
              })}
            >
              <option id="default" value="default" disabled>
                -
              </option>
              <option id="female" value={"F"}>
                여
              </option>
              <option id="male" value={"M"}>
                남
              </option>
            </S.Select>
          ) : (
            <S.Data>{User.gender === "M" ? "남" : "여"}</S.Data>
          )}
        </S.Field>
        <S.Field>
          <S.Label>연락처</S.Label>
          {isEdit ? (
            <>
              <S.Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="010-1234-5678"
                $isError={errors.phone ? true : false}
                {...{
                  ...register("phone", {
                    required: true,
                    pattern: {
                      value: /^010-?([0-9]{4})-?([0-9]{4})$/,
                      message: "형식이 올바르지 않습니다",
                    },
                  }),
                  onChange: (e) =>
                    setValue("phone", phoneNumberAutoFormat(e.target.value)),
                }}
                maxLength={13}
              />

              {errors.phone && (
                <S.ErrorText>{errors.phone.message?.toString()}</S.ErrorText>
              )}
            </>
          ) : (
            <S.Data>
              <S.Phone href={`tel:${User.phone}`}>{User.phone}</S.Phone>
            </S.Data>
          )}
        </S.Field>
        <S.Field>
          <S.Label htmlFor="division">부서</S.Label>
          {isEdit ? (
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
          ) : (
            <S.Data>{User.division}</S.Data>
          )}
        </S.Field>

        <S.Field>
          <S.Label htmlFor="position">직책</S.Label>
          {isEdit ? (
            <S.Select
              id="position"
              disabled={watchDivision === "default"}
              $isError={errors.position ? true : false}
              {...register("position", {
                required: true,
                validate: (v) => v !== "default",
              })}
            >
              <option id="default" value={"default"} disabled>
                -
              </option>
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
          ) : (
            <S.Data>{User.position}</S.Data>
          )}
        </S.Field>

        <S.Field>
          <S.Label htmlFor="area">담당 교실/층(TA·LA만 해당)</S.Label>
          {isEdit ? (
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
          ) : (
            <S.Data>{User.area}</S.Data>
          )}
        </S.Field>

        <S.Field>
          <S.Label htmlFor="roomNum">기숙사 호실</S.Label>
          {isEdit ? (
            <>
              <S.Input
                id="roomNum"
                type="number"
                inputMode="numeric"
                placeholder={User.roomNum.toString()}
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
            </>
          ) : (
            <S.Data>{User.roomNum}</S.Data>
          )}
        </S.Field>
      </S.Container>
      {isAdmin && isEdit ? (
        <S.ButtonsContainer>
          <S.CancelButton
            onClick={() => {
              reset();
              setIsEdit(false);
            }}
          >
            취소하기
          </S.CancelButton>
          <S.EditSaveButton
            disabled={isSubmitting}
            onClick={handleSubmit(handleEdit)}
          >
            저장하기
          </S.EditSaveButton>
        </S.ButtonsContainer>
      ) : (
        <S.EditSaveButton
          onClick={() => {
            if (isAdmin) {
              setIsEdit(true);
            } else {
              alert("관리자 문의");
            }
          }}
        >
          수정하기
        </S.EditSaveButton>
      )}
      {isPowerAdmin && (
        <div
          style={{
            border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <div>관리자 권한 수준[0-2]: {User.admin}</div>
          <button
            style={{
              border: "1px solid red",
            }}
            onClick={() => {
              onGrantAdmin(User._id);
            }}
          >
            관리자 권한 부여
          </button>
          <button
            style={{
              border: "1px solid red",
            }}
            onClick={() => {
              if (window.confirm("정말 삭제합니까?")) {
                onDelete(User._id);
                alert("삭제되었습니다.");
                navigate(-1);
              }
            }}
          >
            해당 유저 삭제
          </button>
        </div>
      )}
    </S.InfoContainer>
  );
}
