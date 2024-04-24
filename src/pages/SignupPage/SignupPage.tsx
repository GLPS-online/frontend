import * as S from "./SignupPageStyled";
import AuthPageRedirector from "../../components/Auth/AuthRedirector";
import SignupForm from "../../components/Auth/SignupForm";
import { signUp } from "@/api/authApi";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  async function handleSignup(data: object) {
    try {
      await signUp(data);
      alert("회원가입 완료");
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  }
  return (
    <S.Container>
      <SignupForm handleSignup={handleSignup} />
      <AuthPageRedirector
        text="이미 가입하셨나요?"
        redirectText="로그인하기"
        redirectLink="/login"
      />
    </S.Container>
  );
}
