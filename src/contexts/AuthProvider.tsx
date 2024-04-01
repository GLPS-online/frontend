import { logIn, logOut } from "../api";
import { createContext, useContext } from "react";

const AuthContext = createContext<{
  getUser: any;
  login: (arg0: any) => void;
  logout: () => void;
}>({ getUser: () => {}, login: () => {}, logout: () => {} });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getUser() {
    const item = await localStorage.getItem("user");
    if (item === undefined) {
      return null;
    }
    const parsed = item !== (undefined || null) ? JSON.parse(item) : null;
    return parsed;
    // if (!item) {
    //   return null;
    // }
    // return JSON.parse(item);
  }

  async function login(data: { user_id: string; password: string }) {
    const newUser = await logIn(data);
    const str = JSON.stringify(newUser);
    localStorage.setItem("user", str);
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
