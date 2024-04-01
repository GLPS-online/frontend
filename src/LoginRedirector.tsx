import { useEffect } from "react";
import { client } from "@/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export default function LoginRedirector({ children }: { children: any }) {
  const navigate = useNavigate();
  const { getUser, logout } = useAuth();

  useEffect(() => {
    const interceptor = client.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        const status = error.response?.status;
        if (status === 401) {
          logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      client.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate]);
  if (!getUser()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
