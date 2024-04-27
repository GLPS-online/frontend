import { logIn } from "@/api/authApi";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<{
  getUser: () => any;
  login: (arg0: any) => void;
  logout: () => void;
}>({
  getUser: () => null,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function getUser() {
    const item = localStorage.getItem("user");
    if (!item || item === "undefined") {
      return null;
    }
    const parsed = JSON.parse(item);
    return parsed;
  }

  async function login(data: { email: string; password: string }) {
    try {
      const res = await logIn(data);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      toast.success(res.user.korName + "님 반갑습니다");
      return res.user;
    } catch (err: any) {
      toast.error(err.response?.data.msg);
      throw new Error(err);
    }
  }

  async function logout() {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("로그아웃 되었습니다");
    } catch (e) {
      console.log(e);
      toast.error("로그아웃에 실패했습니다");
    }
  }

  return (
    <AuthContext.Provider value={{ getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context 안에서 사용하세요");
  }
  return context;
}
