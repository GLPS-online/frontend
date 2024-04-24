import * as S from "./LoginPageStyled";
import AuthPageRedirector from "@/components/Auth/AuthRedirector";
import LoginForm from "@/components/Auth/LoginForm";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(data: { email: string; password: string }) {
    try {
      await login(data);
      navigate("/");
    } catch (error: any) {}
  }
  return (
    <S.Container>
      <LoginForm handleLogin={handleLogin} />
      <AuthPageRedirector
        text="회원이 아니신가요?"
        redirectText="회원가입하기"
        redirectLink="/signup"
      />
    </S.Container>
  );
}
