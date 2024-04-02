import { logIn, logOut } from "@/api";
import Ptla from "@/interfaces/Ptla";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  getUser: () => any;
  login: (arg0: any) => void;
  logout: () => void;
}>({
  getUser: () => {},
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
