import { Link } from "react-router-dom";
import { logIn } from "../../api";
import { useState } from "react";

export default function LoginPage() {
  const [data, setData] = useState({
    user_id: "",
    password: "",
  });

  function handleLogin() {
    try {
      const newUser = logIn(data);
      console.log(newUser);
    } catch (err) {
      console.log(err);
    } finally {
      // navigate("/");
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
      <button onClick={handleLogin}>로그인</button>
      <div>
        회원이 아니신가요? <Link to="/signup">회원가입하기</Link>
      </div>
    </div>
  );
}
