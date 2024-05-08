import client from "./";

export async function createTimeTable(
  className: string,
  advisor: string,
  office: string,
  table: string
) {
  try {
    const response = await client.post(`/timetables/${className}`, {
      advisor,
      office,
      table: JSON.parse(table),
    });
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function deleteTimetable(className: string) {
  try {
    const response = await client.delete(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function initialize(body: string) {
  try {
    const response = await client.post("/students", body);
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function endOfCamp() {
  try {
    const response = await client.delete("/students");
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function InsertUsers(body: string) {
  try {
    const response = await client.post("/users", body);
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function DeleteUsers() {
  try {
    const response = await client.delete("/users");
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function fetchClubChoices() {
  try {
    const response = await client.get("/clubs/choices");
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function updateClubAssignment(body: string) {
  try {
    const response = await client.put("/clubs", body);
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}

export async function grantAdmin(id: string) {
  const response = await client.put(`/auth/grantAdmin/${id}`);
  const result = response.data;
  return result;
}

export async function revokeAdmin(id: string) {
  const response = await client.put(`/auth/revokeAdmin/${id}`);
  const result = response.data;
  return result;
}

export async function changePassword(id: string, newPassword: string) {
  const response = await client.put(`/auth/changePassword/${id}`, {
    newPassword,
  });
  const result = response.data;
  return result;
}
