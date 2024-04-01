import { useEffect } from "react";
import { client } from "./api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";

export default function LoginRedirector() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
    const interceptor = client.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        // const msg = error.response?.data.msg;
        const status = error.response?.status;
        if (status === 401) {
          logout();
          navigate("/login");
          // window.alert("자동으로 로그아웃 되었습니다.");
        }
        //  else {
        //   window.alert(msg);
        // }
        return Promise.reject(error);
      }
    );
    return () => {
      client.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate]);
  return <></>;
}
