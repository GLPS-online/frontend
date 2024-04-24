import * as S from "./SignupPageStyled";
import AuthPageRedirector from "../../components/Auth/AuthRedirector";
import SignupForm from "../../components/Auth/SignupForm";
import { signUp } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { sortOrder } from "@/constants";
import { toast } from "react-toastify";

export default function SignupPage() {
  const navigate = useNavigate();
  async function handleSignup(data: object) {
    //@ts-expect-error
    const order = sortOrder[data.position || "에러"] || 9999;
    try {
      await signUp({ ...data, sortOrder: order });
      toast.success("회원가입 완료");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.msg);
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
