import { logIn, logOut, me } from "../api";
import Ptla from "../interfaces/Ptla";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user: null | Ptla;
  login: (arg0: any) => void;
  logout: () => void;
}>({ user: null, login: () => {}, logout: () => {} });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Ptla | null>(null);

  async function getme() {
    const newUser = await me();
    setUser(newUser);
  }

  async function login(data: { user_id: string; password: string }) {
    const newUser = await logIn(data);
    setUser(newUser);
  }

  async function logout() {
    await logOut();
    setUser(null);
  }

  useEffect(() => {
    getme();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
