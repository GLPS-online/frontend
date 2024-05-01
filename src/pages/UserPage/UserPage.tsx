import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, fetchUser, updateUser } from "@/api/userApi";
import UserForm from "../../components/Forms/UserForm";
import User from "@/interfaces/User";
import * as S from "./UserPageStyled";
import { grantAdmin } from "@/api/adminApi";
import Navigator from "@/components/Navigator/Navigator";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handlefetch(id: string) {
    setIsLoading(true);
    try {
      const newStudent = await fetchUser(id);
      setUser(newStudent);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (id) {
      handlefetch(id);
    }
  }, [id]);

  async function handleUpdate(id: string, body: any) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        const updated = await updateUser(id, body);
        setUser(updated);
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      }
    }
  }

  async function handleDelete(id: string) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        await deleteUser(id);
        toast.update(toastId, {
          render: "삭제 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
        navigate(-1);
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      }
    }
  }

  async function handleGrantAdmin(id: string) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        const updated = await grantAdmin(id);
        setUser(updated);
        toast.update(toastId, {
          render: "업데이트 완료👌",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: `${err.response?.data.msg}`,
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
      }
    }
  }

  return (
    <S.PageContainer>
      {isLoading ? (
        <Spinner />
      ) : user ? (
        <>
          <h1>사용자 상세보기</h1>
          <UserForm
            user={user}
            onEdit={handleUpdate}
            onGrantAdmin={handleGrantAdmin}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <>
          cannot find a user with id : {id}
          <br />
          <br />
        </>
      )}
      <Navigator />
    </S.PageContainer>
  );
}
