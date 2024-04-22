import client from "./";

export async function fetchUsers() {
  try {
    const response = await client.get("/users");
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function fetchUser(id: string) {
  try {
    const response = await client.get(`/users/${id}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
export async function updateUser(id: string, body: Object) {
  try {
    const response = await client.put(`/users/${id}`, body);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
export async function deleteUser(id: string) {
  try {
    const response = await client.delete(`/users/${id}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
export async function searchUser({
  position,
  area,
}: {
  position?: string;
  area?: string;
}) {
  try {
    const response = await client.get("/users", {
      params: {
        ...(position && {
          position,
        }),
        ...(area && {
          area,
        }),
      },
    });
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
