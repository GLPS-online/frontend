import { toast } from "react-toastify";
import ModalContainer from "./common/ModalContainer";
import * as S from "./common/ModalStyled";
import * as F from "./common/EditableFormStyled";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/contexts/AuthProvider";
import { useForm } from "react-hook-form";
import {
  HQpositions,
  LApositions,
  PApositions,
  TApositions,
  classRooms,
  clubList,
  floorList,
} from "@/constants";
import { Link } from "react-router-dom";
import { getFloorGender, phoneNumberAutoFormat } from "@/utils/etc";
import { deleteUser, fetchUser, updateUser } from "@/api/userApi";
import User from "@/interfaces/User";
import { grantAdmin } from "@/api/adminApi";

interface Props {
  handleModalClose: () => void;
  id: string;
}

export default function UserModal({ handleModalClose, id }: Props) {
  const queryClient = useQueryClient();
  const { getUser } = useAuth();
  const isAdmin = getUser()?.admin > 0;
  const isPowerAdmin = getUser()?.admin > 1;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
  });

  const watchDivision = watch("division");
  useEffect(() => {
    if (user && getValues("division") !== user.division) {
      setValue("position", "default");
      setValue("area", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDivision]);

  useEffect(() => {
    async function handlefetch(id: string) {
      setIsLoading(true);
      try {
        const newUser = await fetchUser(id);
        reset(newUser);
        setUser(newUser);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      handlefetch(id);
    }
  }, [id, reset]);

  async function handleUpdate() {
    const id = user?._id;
    const body = getValues();
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        const updated = await updateUser(id, body);
        setUser(updated);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      } finally {
        setIsEdit(false);
      }
    }
  }

  async function handleDelete() {
    const id = user?._id;
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        await deleteUser(id);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.update(toastId, {
          render: "삭제 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
        handleModalClose();
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      }
    }
  }

  async function handleGrantAdmin() {
    const id = user?._id;
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        const updated = await grantAdmin(id);
        setUser(updated);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      }
    }
  }

  // async function handleChangePassworkd() {
  //   const id = user?._id;
  //   if (id) {
  //     const toastId = toast.loading("업데이트 중...");
  //     try {
  //       // const updated = await changePassword(id, newPassword);
  //       // setUser(updated);
  //       toast.update(toastId, {
  //         render: "업데이트 완료👌",
  //         type: "success",
  //         autoClose: 2500,
  //         isLoading: false,
  //       });
  //     } catch (err: any) {
  //       toast.update(toastId, {
  //         render: `${err.response?.data.msg}`,
  //         type: "error",
  //         autoClose: 2500,
  //         isLoading: false,
  //       });
  //     }
  //   }
  // }
  return (
    <ModalContainer
      title={"사용자 상세보기🧑‍🍼"}
      handleModalClose={handleModalClose}
      isScrollable={true}
    >
      {isLoading ? (
        <Spinner />
      ) : user ? (
        <>
          <F.InfoContainer>
            <F.Form autoComplete="off">
              <F.Fields disabled={isSubmitting}>
                <F.Field>
                  <F.Label>이름</F.Label>
                  <F.Data>{user.korName}</F.Data>
                </F.Field>
                <F.Field>
                  <F.Label>기수</F.Label>
                  {isEdit ? (
                    <>
                      <F.Input
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
                        <F.ErrorText>
                          {errors.wave.message?.toString()}
                        </F.ErrorText>
                      )}
                    </>
                  ) : (
                    <F.Data>{user.wave}</F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>연락처</F.Label>
                  {isEdit ? (
                    <>
                      <F.Input
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
                            setValue(
                              "phone",
                              phoneNumberAutoFormat(e.target.value)
                            ),
                        }}
                        maxLength={13}
                      />

                      {errors.phone && (
                        <F.ErrorText>
                          {errors.phone.message?.toString()}
                        </F.ErrorText>
                      )}
                    </>
                  ) : (
                    <F.Data>
                      <F.Phone as="a" href={`tel:${user.phone}`}>
                        {user.phone}
                      </F.Phone>
                    </F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>부서</F.Label>
                  {isEdit ? (
                    <F.Select
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
                    </F.Select>
                  ) : (
                    <F.Data>{user.division}</F.Data>
                  )}
                </F.Field>

                <F.Field>
                  <F.Label>직책</F.Label>
                  {isEdit ? (
                    <F.Select
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
                    </F.Select>
                  ) : (
                    <F.Data>{user.position}</F.Data>
                  )}
                </F.Field>

                <F.Field>
                  <F.Label>담당 교실/층</F.Label>
                  {isEdit ? (
                    <F.Select
                      id="area"
                      disabled={
                        watchDivision !== "TA" && watchDivision !== "LA"
                      }
                      defaultValue={""}
                      $isError={errors.area ? true : false}
                      {...register("area", { required: false })}
                    >
                      <option id="" value={""}>
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
                    </F.Select>
                  ) : (
                    <F.Data>{user.area}</F.Data>
                  )}
                </F.Field>

                <F.Field>
                  <F.Label>기숙사 호실</F.Label>
                  {isEdit ? (
                    <>
                      <F.Input
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
                        <F.ErrorText>
                          {errors.roomNum.message?.toString()}
                        </F.ErrorText>
                      )}
                    </>
                  ) : (
                    <F.Data>
                      {user.roomNum + getFloorGender(user.roomNum)}
                    </F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>동아리</F.Label>
                  {isEdit ? (
                    <F.Select
                      id="club"
                      $isError={errors.club ? true : false}
                      {...register("club")}
                    >
                      <option value=""></option>
                      {clubList?.map((club, i) => (
                        <option key={i} id={club} value={club}>
                          {club}
                        </option>
                      ))}
                    </F.Select>
                  ) : (
                    <F.Data>
                      {user.club ? (
                        <F.Phone>
                          <Link to={"/clubs/?club=" + user.club}>
                            {user.club}
                          </Link>
                        </F.Phone>
                      ) : (
                        <></>
                      )}
                    </F.Data>
                  )}
                </F.Field>
              </F.Fields>
            </F.Form>
            {isPowerAdmin && (
              <div
                style={{
                  border: "1px solid var(--red)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  gap: "10px",
                }}
              >
                <div>관리자 권한 수준[0-2]: {user.admin}</div>
                <button
                  style={{
                    border: "1px solid var(--red)",
                  }}
                  onClick={handleGrantAdmin}
                >
                  관리자 권한 부여
                </button>
                <button
                  style={{
                    border: "1px solid var(--red)",
                  }}
                  onClick={() => {
                    if (window.confirm("정말 삭제합니까?")) {
                      handleDelete();
                    }
                  }}
                >
                  해당 유저 삭제
                </button>
              </div>
            )}
          </F.InfoContainer>
        </>
      ) : (
        <>
          cannot find a student with id : {id}
          <br />
          <br />
        </>
      )}
      {isEdit ? (
        <S.Buttons>
          <S.Button
            disabled={isSubmitting}
            onClick={() => {
              reset();
              setIsEdit(false);
            }}
          >
            취소
          </S.Button>
          <S.Button
            $color="edit"
            disabled={isSubmitting}
            onClick={handleSubmit(handleUpdate)}
          >
            저장
          </S.Button>
        </S.Buttons>
      ) : (
        <S.Buttons>
          <S.Button disabled={isSubmitting} onClick={handleModalClose}>
            닫기
          </S.Button>
          <S.Button
            $color="edit"
            disabled={(isAdmin ? false : true) || isSubmitting}
            onClick={() => {
              setIsEdit(true);
            }}
          >
            수정
          </S.Button>
        </S.Buttons>
      )}
    </ModalContainer>
  );
}
