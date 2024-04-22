import client from "./";

export async function fetchStudents() {
  try {
    const response = await client.get("/students");
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function fetchStudent(id: string) {
  try {
    const response = await client.get(`/students/${id}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
export async function updateStudent(id: string, body: Object) {
  try {
    const response = await client.put(`/students/${id}`, body);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
