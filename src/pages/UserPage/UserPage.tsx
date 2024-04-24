import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, fetchUser, updateUser } from "@/api/userApi";
import UserForm from "./UserForm";
import User from "@/interfaces/User";
import * as S from "./UserPageStyled";
import { grantAdmin } from "@/api/adminApi";
import Navigator from "@/components/Navigator/Navigator";
import { toast } from "react-toastify";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [User, setUser] = useState<User | null>(null);

  async function handleFecth(id: string) {
    const newUser = await fetchUser(id);
    setUser(newUser);
  }

  async function handleUpdate(id: string, body: object) {
    if (id) {
      try {
        const newUser = await updateUser(id, body);
        toast.success("업데이트에 성공했습니다.");
        setUser(newUser);
      } catch (err: any) {
        toast.error(err.response?.msg);
      }
    }
  }

  async function handleDelete(id: string) {
    if (id) {
      try {
        await deleteUser(id);
        toast.success("삭제되었습니다.");
        navigate(-1);
      } catch (err: any) {
        toast.error(err.response?.msg);
      }
    }
  }

  async function handleGrantAdmin(id: string) {
    if (id) {
      try {
        const newUser = await grantAdmin(id);
        toast.success("업데이트에 성공했습니다.");
        setUser(newUser);
      } catch (err: any) {
        toast.error(err.response?.msg);
      }
    }
  }

  useEffect(() => {
    if (id) {
      handleFecth(id);
    }
  }, [id]);
  return (
    <S.PageContainer>
      {User ? (
        <>
          <h1>사용자 상세보기</h1>
          <UserForm
            User={User}
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
