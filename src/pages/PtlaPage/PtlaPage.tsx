import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deletePtla, fetchPtla, grantAdmin, updatePtla } from "@/api";
import Ptla from "@/interfaces/Ptla";
import * as S from "./PtlaPageStyled";
import OtherInfo from "./OtherInfo";
import AdminInfo from "./AdminInfo";

export default function PtlaPage() {
  const { id } = useParams();

  const [Ptla, setPtla] = useState<Ptla | null>(null);

  async function handleFecth(id: string) {
    const newPtla = await fetchPtla(id);
    setPtla(newPtla);
  }

  async function handleUpdate(id: string, body: object) {
    if (id) {
      try {
        const newPtla = await updatePtla(id, body);
        setPtla(newPtla);
      } catch (e) {
        console.log("update failed");
      }
    }
  }

  async function handleDelete(id: string) {
    if (id) {
      try {
        await deletePtla(id);
      } catch (e) {
        console.log("deletion failed");
      }
    }
  }

  async function handleGrantAdmin(id: string) {
    if (id) {
      try {
        const newPtla = await grantAdmin(id);
        setPtla(newPtla);
      } catch (e) {
        console.log("update failed");
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
      {Ptla ? (
        <>
          <OtherInfo Ptla={Ptla} />
          <AdminInfo
            Ptla={Ptla}
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
