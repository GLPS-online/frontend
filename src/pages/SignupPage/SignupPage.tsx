import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "@/api";

export default function SignupPage() {
  const [data, setData] = useState({
    user_id: "",
    password: "",
    korName: "",
    engName: "",
    wave: "",
    gender: "",
    phone: "",
    division: "",
    role: "",
    area: "",
    roomNum: "",
  });

  function handleSignup() {
    try {
      const newUser = signUp(data);
      console.log(newUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <input
        type="text"
        value={data.user_id}
        onChange={(e) => setData({ ...data, user_id: e.target.value })}
        placeholder="아이디"
      />
      <input
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="비밀번호"
      />
      <input
        type="text"
        value={data.korName}
        onChange={(e) => setData({ ...data, korName: e.target.value })}
        placeholder="국문 이름"
      />
      <input
        type="text"
        value={data.engName}
        onChange={(e) => setData({ ...data, engName: e.target.value })}
        placeholder="영문 이름"
      />
      <input
        type="number"
        inputMode="numeric"
        value={data.wave}
        onChange={(e) => setData({ ...data, wave: e.target.value })}
        placeholder="기수"
      />
      <select
        value={data.gender}
        onChange={(e) => setData({ ...data, gender: e.target.value })}
      >
        <option id="female" value={"F"}>
          여
        </option>
        <option id="male" value={"M"}>
          남
        </option>
        <option id="other" value={"O"}>
          제 3의 성
        </option>
      </select>
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        placeholder="휴대전화"
      />
      <select
        value={data.division}
        onChange={(e) => setData({ ...data, division: e.target.value })}
      >
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
      <input // 나중에 select option으로 바꾸기
        type="text"
        value={data.role}
        onChange={(e) => setData({ ...data, role: e.target.value })}
        placeholder="역할"
      />
      <input // 나중에 select option으로 바꾸기
        type="text"
        value={data.area}
        onChange={(e) => setData({ ...data, area: e.target.value })}
        placeholder="담당구역"
      />
      <input
        type="number"
        inputMode="numeric"
        value={data.roomNum}
        onChange={(e) => setData({ ...data, roomNum: e.target.value })}
        placeholder="기숙사 호실"
      />

      <button onClick={handleSignup}>가입하기 / 수정하기</button>
      <div>
        이미 회원이신가요? <Link to="/login">로그인하기</Link>
      </div>
    </div>
  );
}
