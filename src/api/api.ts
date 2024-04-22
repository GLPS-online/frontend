import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export async function fetchClassList() {
  try {
    const response = await client.get("/timetables");
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function fetchTimetable(className: string) {
  try {
    const response = await client.get(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function signUp(data: object) {
  try {
    const response = await client.post(`/auth/signup`, data);
    // if(!response.ok){

    // }
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function logIn(data: object) {
  const response = await client.post(`/auth/login`, data);

  const result = response.data;
  return result;
}

export async function logOut() {
  try {
    await client.delete(`/auth/logout`);
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function me() {
  try {
    const response = await client.get(`/auth/me`);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

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
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function deleteTimetable(className: string) {
  try {
    const response = await client.delete(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function initialize(body: string) {
  try {
    const response = await client.post("/students", body);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function endOfCamp() {
  try {
    const response = await client.delete("/students");
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}

export async function grantAdmin(id: string) {
  try {
    const response = await client.put(`auth/grantAdmin/${id}`);
    const result = response.data;
    return result;
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data.msg);
  }
}
