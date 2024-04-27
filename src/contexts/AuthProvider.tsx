import { logIn, logOut } from "@/api/authApi";
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
      const newUser = await logIn(data);
      const str = JSON.stringify(newUser);
      localStorage.setItem("user", str);
      toast.success(newUser.korName + "님 반갑습니다");
      return newUser;
    } catch (err: any) {
      toast.error(err.response?.data.msg);
      throw new Error(err);
    }
  }

  async function logout() {
    await logOut();
    localStorage.removeItem("user");
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
