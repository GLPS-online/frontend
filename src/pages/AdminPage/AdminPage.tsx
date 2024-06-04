import { useEffect, useState } from "react";
import * as S from "./AdminPageStyled";
import * as Placeholders from "./placeholders";
import {
  endOfCamp,
  initialize,
  createTimeTable,
  deleteTimetable,
  InsertUsers,
  DeleteUsers,
  fetchClubChoices,
  updateClubAssignment,
  signupOpen,
  signupClose,
  assignClasses,
} from "@/api/adminApi";
import { classList } from "@/constants";
import { createMeal, deleteMeals } from "@/api/mealApi";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    students: "",
    classes: "",
    users: "",
    clubChoices: "",
    clubAssignment: "",
    className: "",
    advisor: "",
    office: "",
    classNameToDelete: "",
    table: "",
    dayIndex: 0,
    timeIndex: 0,
    menu: "",
  });

  async function handleInitializeStudents() {
    try {
      setIsLoading(true);
      const res = await initialize(state.students);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({ ...prev, students: "" }));
      setIsLoading(false);
    }
  }

  async function handleAssignClass() {
    try {
      setIsLoading(true);
      const res = await assignClasses(state.classes);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({ ...prev, students: "" }));
      setIsLoading(false);
    }
  }

  async function handleDeleteStudents() {
    try {
      setIsLoading(true);
      const res = await endOfCamp();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleInsertUsers() {
    try {
      setIsLoading(true);
      const res = await InsertUsers(state.users);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({ ...prev, users: "" }));
      setIsLoading(false);
    }
  }

  async function handleDeleteUsers() {
    try {
      setIsLoading(true);
      const res = await DeleteUsers();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleTimetableCreation() {
    try {
      setIsLoading(true);
      const { className, advisor, office, table } = state;
      const res = await createTimeTable(className, advisor, office, table);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({
        ...prev,
        className: "",
        advisor: "",
        office: "",
        table: "",
      }));
      setIsLoading(false);
    }
  }

  async function handleTimetableDeletion() {
    try {
      setIsLoading(true);
      const res = await deleteTimetable(state.classNameToDelete);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({ ...prev, classNameToDelete: "" }));
      setIsLoading(false);
    }
  }

  async function handleClubAssignment() {
    try {
      setIsLoading(true);
      const res = await updateClubAssignment(state.clubAssignment);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({ ...prev, clubAssignment: "" }));
      setIsLoading(false);
    }
  }
  async function handlefetch() {
    try {
      setIsLoading(true);
      const res = await fetchClubChoices();
      console.log(res);
      setState((prev) => ({ ...prev, clubChoices: JSON.stringify(res) }));
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleMenuCreation() {
    try {
      setIsLoading(true);
      const { dayIndex, timeIndex, menu } = state;
      const res = await createMeal(dayIndex, timeIndex, menu);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setState((prev) => ({ ...prev, menu: "" }));
      setIsLoading(false);
    }
  }
  async function handleMenuDeletion() {
    try {
      setIsLoading(true);
      const res = await deleteMeals();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSignupOpen() {
    try {
      setIsLoading(true);
      const res = await signupOpen();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignupClose() {
    try {
      setIsLoading(true);
      const res = await signupClose();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <S.Container>
      <S.Header>관리자용 페이지 입니다</S.Header>
      <S.Content>
        학생 삽입
        <S.Textarea
          placeholder={Placeholders.studentsInitializer}
          value={state.students}
          onChange={(e) =>
            setState((prev) => ({ ...prev, students: e.target.value }))
          }
          rows={30}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleInitializeStudents}>
          삽입하기
        </S.Button>
      </S.Content>
      <S.Content>
        학생 학급 배정
        <S.Textarea
          placeholder={Placeholders.classAssignment}
          value={state.classes}
          onChange={(e) =>
            setState((prev) => ({ ...prev, classes: e.target.value }))
          }
          rows={30}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleAssignClass}>
          삽입하기
        </S.Button>
      </S.Content>
      <S.Content>
        학생 전체 삭제
        <S.DangerButton disabled={isLoading} onClick={handleDeleteStudents}>
          삭제하기
        </S.DangerButton>
      </S.Content>
      <S.Content>
        유저 삽입 (개발용)
        <S.Textarea
          placeholder={Placeholders.usersInitializer}
          value={state.users}
          onChange={(e) =>
            setState((prev) => ({ ...prev, users: e.target.value }))
          }
          rows={30}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleInsertUsers}>
          삽입하기
        </S.Button>
      </S.Content>
      <S.Content>
        관리자를 제외한 유저 전체 삭제
        <S.DangerButton disabled={isLoading} onClick={handleDeleteUsers}>
          삭제하기
        </S.DangerButton>
      </S.Content>
      <S.Content>
        학생 동아리 배정을 위한 JSON
        <S.Textarea
          value={state.clubChoices}
          onChange={(e) => {}}
          rows={20}
          cols={70}
        />
      </S.Content>
      <S.Content>
        학생 동아리 배정 업로드
        <S.Textarea
          value={state.clubAssignment}
          onChange={(e) => {
            setState((prev) => ({ ...prev, clubAssignment: e.target.value }));
          }}
          rows={30}
          cols={70}
          placeholder={Placeholders.clubAssignment}
        />
        <S.Button
          disabled={isLoading}
          onClick={(e) => {
            handleClubAssignment();
          }}
        >
          업로드
        </S.Button>
      </S.Content>
      <S.Content>
        시간표 삽입
        <select
          value={state.className}
          onChange={(e) =>
            setState((prev) => ({ ...prev, className: e.target.value }))
          }
        >
          {classList.map((item) => (
            <option key={item} value={item}>
              {item}반
            </option>
          ))}
        </select>
        <S.TextInput
          type="text"
          value={state.advisor}
          onChange={(e) =>
            setState((prev) => ({ ...prev, advisor: e.target.value }))
          }
          placeholder="어드바이저 이름"
        />
        <S.TextInput
          type="text"
          value={state.office}
          onChange={(e) =>
            setState((prev) => ({ ...prev, office: e.target.value }))
          }
          placeholder="어드바이저 오피스"
        />
        <S.Textarea
          placeholder={Placeholders.timetable}
          value={state.table}
          onChange={(e) =>
            setState((prev) => ({ ...prev, table: e.target.value }))
          }
          rows={18}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleTimetableCreation}>
          삽입하기
        </S.Button>
      </S.Content>
      <S.Content>
        시간표 삭제
        <select
          value={state.classNameToDelete}
          onChange={(e) =>
            setState((prev) => ({ ...prev, classNameToDelete: e.target.value }))
          }
        >
          {classList.map((item) => (
            <option key={item} value={item}>
              {item}반
            </option>
          ))}
        </select>
        <S.DangerButton disabled={isLoading} onClick={handleTimetableDeletion}>
          삭제하기
        </S.DangerButton>
      </S.Content>
      <S.Content>
        식단표 삽입. (주의: 이미 존재하는 요일/시간에 대해서는 덮어쓰기가
        됩니다)
        <select
          value={state.dayIndex}
          onChange={(e) =>
            setState((prev) => ({ ...prev, dayIndex: Number(e.target.value) }))
          }
        >
          <option value={0}>월요일</option>
          <option value={1}>화요일</option>
          <option value={2}>수요일</option>
          <option value={3}>목요일</option>
          <option value={4}>금요일</option>
          <option value={5}>토요일</option>
          <option value={6}>일요일</option>
        </select>
        <select
          value={state.timeIndex}
          onChange={(e) =>
            setState((prev) => ({ ...prev, timeIndex: Number(e.target.value) }))
          }
        >
          <option value={0}>아침</option>
          <option value={1}>점심</option>
          <option value={2}>저녁</option>
          <option value={3}>혼정빵</option>
        </select>
        <S.Textarea
          placeholder={Placeholders.menu}
          value={state.menu}
          onChange={(e) =>
            setState((prev) => ({ ...prev, menu: e.target.value }))
          }
          rows={18}
          cols={70}
        />
        <S.Button disabled={isLoading} onClick={handleMenuCreation}>
          삽입하기
        </S.Button>
      </S.Content>
      <S.Content>
        식단표 전체 삭제
        <S.DangerButton disabled={isLoading} onClick={handleMenuDeletion}>
          삭제하기
        </S.DangerButton>
      </S.Content>
      <S.Content>
        <S.DangerButton disabled={isLoading} onClick={handleSignupOpen}>
          회원가입 열기
        </S.DangerButton>
        <S.DangerButton disabled={isLoading} onClick={handleSignupClose}>
          회원가입 닫기
        </S.DangerButton>
      </S.Content>
    </S.Container>
  );
}
