import { fetchStudents } from "@/api/studentApi";
import Spinner from "@/components/Spinner";
import AdmissionTable from "@/components/Table/AdmissionTable";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function AdmissionPage() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["admission"],
    queryFn: fetchStudents,
    refetchOnWindowFocus: true,
    refetchInterval: 5000, //5초마다 refetch
  });
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1 style={{ alignSelf: "flex-start" }}>입소관리</h1>
      {isLoading ? <Spinner /> : <AdmissionTable data={data} />}
    </>
  );
}
