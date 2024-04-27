import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, fetchUser, updateUser } from "@/api/userApi";
import UserForm from "./UserForm";
import User from "@/interfaces/User";
import * as S from "./UserPageStyled";
import { grantAdmin } from "@/api/adminApi";
import Navigator from "@/components/Navigator/Navigator";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, data: user = null } = useQuery<User | null>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id || ""),
    enabled: id !== "",
  });

  async function handleUpdate(id: string, body: object) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        console.log(queryClient.getQueryData(["user", id]));
        queryClient.setQueryData(["user", id], {
          ...queryClient.getQueryData(["user", id]),
          ...body,
        });
        await updateUser(id, body);
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
      } finally {
        queryClient.invalidateQueries({ queryKey: ["user", id] });
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
      } finally {
        queryClient.removeQueries({ queryKey: ["user", id] });
      }
    }
  }

  async function handleGrantAdmin(id: string) {
    if (id) {
      const toastId = toast.loading("업데이트 중...");
      try {
        await grantAdmin(id);
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
      } finally {
        queryClient.invalidateQueries({ queryKey: ["user", id] });
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
