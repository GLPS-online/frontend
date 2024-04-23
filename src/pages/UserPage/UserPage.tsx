import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteUser, fetchUser, updateUser } from "@/api/userApi";
import User from "@/interfaces/User";
import * as S from "./UserPageStyled";
import OtherInfo from "./OtherInfo";
import AdminInfo from "./AdminInfo";
import { grantAdmin } from "@/api/adminApi";

export default function UserPage() {
  const { id } = useParams();

  const [User, setUser] = useState<User | null>(null);

  async function handleFecth(id: string) {
    const newUser = await fetchUser(id);
    setUser(newUser);
  }

  async function handleUpdate(id: string, body: object) {
    if (id) {
      try {
        const newUser = await updateUser(id, body);
        setUser(newUser);
      } catch (e) {
        console.log(e);
        alert("update failed");
      }
    }
  }

  async function handleDelete(id: string) {
    if (id) {
      try {
        await deleteUser(id);
      } catch (e) {
        console.log(e);
        alert("deletion failed");
      }
    }
  }

  async function handleGrantAdmin(id: string) {
    if (id) {
      try {
        const newUser = await grantAdmin(id);
        setUser(newUser);
      } catch (e) {
        console.log(e);
        alert("update failed");
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
          <OtherInfo User={User} />
          <AdminInfo
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
    </S.PageContainer>
  );
}
