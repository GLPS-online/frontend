import { toast } from "react-toastify";
import ModalContainer from "./common/ModalContainer";
import * as S from "./common/ModalStyled";
import * as F from "./common/EditableFormStyled";
import Student from "@/interfaces/Student";
import { useEffect, useState } from "react";
import { fetchStudent, updateStudent } from "@/api/studentApi";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { classList, clubList } from "@/constants";
import { Link } from "react-router-dom";
import { isBirthday } from "@/utils/etc";

interface Props {
  handleModalClose: () => void;
  id: string;
}

export default function StudentModal({ handleModalClose, id }: Props) {
  const queryClient = useQueryClient();

  const { getUser } = useAuth();
  const isAdmin = getUser()?.admin > 0;
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    async function handlefetch(id: string) {
      setIsLoading(true);
      try {
        const newStudent = await fetchStudent(id);
        reset(newStudent);
        setStudent(newStudent);
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
    const id = student?._id;
    const body = getValues();
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        const updated = await updateStudent(id, body);
        setStudent(updated);
        queryClient.invalidateQueries({ queryKey: ["students"] });
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

  return (
    <ModalContainer
      title={"학생 상세보기 👶"}
      handleModalClose={handleModalClose}
      isScrollable={true}
    >
      {isLoading ? (
        <Spinner />
      ) : student ? (
        <>
          <F.InfoContainer autoFocus>
            <F.Form autoComplete="off">
              <F.Fields disabled={isSubmitting}>
                <F.Field>
                  <F.Label>이름</F.Label>
                  {isEdit ? (
                    <F.Input
                      id="korName"
                      type="text"
                      placeholder={student.korName}
                      $isError={errors.korName ? true : false}
                      {...register("korName", {
                        required: true,
                      })}
                    />
                  ) : (
                    <F.Data>{student.korName}</F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>상태</F.Label>
                  {isEdit ? (
                    <F.Select
                      id="status"
                      $isError={errors.status ? true : false}
                      {...register("status", {
                        required: true,
                      })}
                    >
                      <option id="active" value="active">
                        재적 ✅
                      </option>
                      <option id="absent" value="absent">
                        임시귀가 🏠
                      </option>
                      <option id="hospital" value="hospital">
                        병원진료 🏥
                      </option>
                      <option id="discharged" value="discharged">
                        퇴소 ❌
                      </option>
                    </F.Select>
                  ) : (
                    <F.Data>
                      {(() => {
                        switch (student.status) {
                          case "active":
                            return "재적 ✅";
                          case "absent":
                            return "임시귀가 🏠";
                          case "hospital":
                            return "병원진료 🏥";
                          case "discharged":
                            return "퇴소 ❌";
                          default:
                            return "오류입니다.";
                        }
                      })()}
                    </F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>학급</F.Label>
                  {isEdit ? (
                    <F.Select
                      id="className"
                      $isError={errors.className ? true : false}
                      {...register("className", {
                        required: true,
                        validate: (v) => classList.includes(v),
                      })}
                    >
                      {classList?.map((className, i) => (
                        <option key={i} id={className} value={className}>
                          {className} 반
                        </option>
                      ))}
                    </F.Select>
                  ) : (
                    <F.Data>{student.className}</F.Data>
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
                        placeholder={student.roomNum.toString()}
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
                    <F.Data>{student.roomNum}</F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>형제자매</F.Label>
                  {isEdit ? (
                    <>
                      <F.Input
                        id="sibling"
                        type="text"
                        placeholder="이름을 정확히 입력하세요"
                        $isError={errors.sibling ? true : false}
                        {...register("sibling")}
                      />
                    </>
                  ) : (
                    <F.Data>
                      {student.sibling ? (
                        <F.Link>
                          <Link to={"/?korName=" + student.sibling}>
                            {student.sibling}
                          </Link>
                        </F.Link>
                      ) : (
                        <></>
                      )}
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
                      <option value="" />
                      {clubList?.map((club, i) => (
                        <option key={i} id={club} value={club}>
                          {club}
                        </option>
                      ))}
                    </F.Select>
                  ) : (
                    <F.Data>
                      {student.club ? (
                        <F.Link>
                          <Link to={"/clubs/?club=" + student.club}>
                            {student.club}
                          </Link>
                        </F.Link>
                      ) : (
                        <></>
                      )}
                    </F.Data>
                  )}
                </F.Field>
                <F.Field>
                  <F.Label>학적</F.Label>
                  <F.ReadOnlyData>
                    {student.school + " " + student.grade + "학년"}
                  </F.ReadOnlyData>
                </F.Field>
                <F.Field>
                  <F.Label>생년월일</F.Label>
                  <F.ReadOnlyData>
                    {student.birthDate +
                      (isBirthday(student.birthDate) ? "🎂" : "")}
                  </F.ReadOnlyData>
                </F.Field>
                <F.Field>
                  <F.Label>알레르기</F.Label>
                  <F.ReadOnlyData>{student.allergy}</F.ReadOnlyData>
                </F.Field>
                <F.Field>
                  <F.Label>상의 사이즈</F.Label>
                  <F.ReadOnlyData>{student.shirtSize}</F.ReadOnlyData>
                </F.Field>
              </F.Fields>
              {/* <S.Field>
            <S.Label>자택 주소</S.Label>
            <S.ReadOnlyData>
              {student.address + " (" + student.postNum + ")"}
            </S.ReadOnlyData>
          </S.Field> */}
              <F.Field>
                <F.Label>보호자 연락처</F.Label>
                <F.ReadOnlyData>
                  <>
                    <span style={{ fontSize: "15px", lineHeight: "140%" }}>
                      {student.parent1Relation + ": "}
                      <F.Phone as="a" href={`tel:${student.parent1Phone}`}>
                        {student.parent1Phone}
                      </F.Phone>
                    </span>
                    <br />
                    {student.parent2Relation && (
                      <span style={{ fontSize: "15px" }}>
                        {student.parent2Relation + ": "}
                        <F.Phone as="a" href={`tel:${student.parent2Phone}`}>
                          {student.parent2Phone}
                        </F.Phone>
                      </span>
                    )}
                  </>
                </F.ReadOnlyData>
              </F.Field>
            </F.Form>
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
