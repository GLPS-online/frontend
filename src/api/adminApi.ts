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

export async function grantAdmin(id: string) {
  try {
    const response = await client.put(`auth/grantAdmin/${id}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    alert(err.response?.status);
    alert(err.response?.data.msg);
  }
}
