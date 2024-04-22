import client from "./";

export async function fetchStudents() {
  const response = await client.get("/students");
  const result = response.data;
  return result;
}

export async function fetchStudent(id: string) {
  const response = await client.get(`/students/${id}`);
  const result = response.data;
  return result;
}

export async function updateStudent(id: string, body: Object) {
  const response = await client.put(`/students/${id}`, body);
  const result = response.data;
  return result;
}
