import User from "@/interfaces/User";
import * as S from "./UserPageStyled";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
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
import { toast } from "react-toastify";

export default function UserForm({
  user,
  onEdit,
  onGrantAdmin,
  onDelete,
}: {
  user: User;
  onEdit: (arg0: string, arg1: object) => void;
  onGrantAdmin: (arg0: string) => void;
  onDelete: (arg0: string) => void;
}) {
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
      korName: user.korName,
      wave: user.wave,
      gender: user.gender,
      phone: user.phone,
      division: user.division,
      position: user.position,
      area: user.area,
      roomNum: user.roomNum,
    },
  });
  const watchDivision = watch("division");
  useEffect(() => {
    if (getValues("division") !== user.division) {
      setValue("position", "default");
      setValue("area", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDivision]);

  async function handleEdit() {
    await onEdit(user._id, getValues());
    setIsEdit(false);
  }
  return (
    <S.InfoContainer>
      <S.Container autoComplete="off">
        <S.Fields disabled={isSubmitting}>
          <S.Field>
            <S.Label>이름</S.Label>
            {isEdit ? (
              <S.Input
                id="korName"
                type="text"
                placeholder={user.korName}
                $isError={errors.korName ? true : false}
                {...register("korName", {
                  required: true,
                })}
              />
            ) : (
              <S.Data>{user.korName}</S.Data>
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
                  placeholder={user.wave.toString()}
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
              <S.Data>{user.wave}</S.Data>
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
              <S.Data>{user.gender === "M" ? "남" : "여"}</S.Data>
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
                <S.Phone href={`tel:${user.phone}`}>{user.phone}</S.Phone>
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
              <S.Data>{user.division}</S.Data>
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
              <S.Data>{user.position}</S.Data>
            )}
          </S.Field>

          <S.Field>
            <S.Label htmlFor="area">담당 교실/층(TA·LA)</S.Label>
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
              <S.Data>{user.area}</S.Data>
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
                  placeholder={user.roomNum.toString()}
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
                  <S.ErrorText>
                    {errors.roomNum.message?.toString()}
                  </S.ErrorText>
                )}
              </>
            ) : (
              <S.Data>{user.roomNum}</S.Data>
            )}
          </S.Field>
        </S.Fields>
        {isEdit ? (
          <S.ButtonsContainer>
            <S.CancelButton
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setIsEdit(false);
              }}
            >
              취소
            </S.CancelButton>
            <S.EditSaveButton
              disabled={isSubmitting}
              onClick={handleSubmit(handleEdit)}
            >
              저장
            </S.EditSaveButton>
          </S.ButtonsContainer>
        ) : (
          <S.ButtonsContainer>
            <S.EditSaveButton
              onClick={() => {
                if (isAdmin) {
                  setIsEdit(true);
                } else {
                  toast.error("권한이 없습니다");
                }
              }}
            >
              수정
            </S.EditSaveButton>
          </S.ButtonsContainer>
        )}
      </S.Container>
      {isPowerAdmin && (
        <div
          style={{
            border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "10px",
          }}
        >
          <div>관리자 권한 수준[0-2]: {user.admin}</div>
          <button
            style={{
              border: "1px solid red",
            }}
            onClick={() => {
              onGrantAdmin(user._id);
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
                onDelete(user._id);
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
