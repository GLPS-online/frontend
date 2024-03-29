import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

console.log(BASE_URL);
const client = axios.create({
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
  } catch (err) {
    console.log(err);
  }
}

export async function fetchStudent(id: string) {
  try {
    const response = await client.get(`/students/${id}`);
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}
export async function updateStudent(id: string, body: Object) {
  try {
    const response = await client.put(`/students/${id}`, body);
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchPtlas() {
  try {
    const response = await client.get("/ptlas");
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchPtla(id: string) {
  try {
    const response = await client.get(`/ptlas/${id}`);
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function searchPtla({
  role,
  area,
}: {
  role?: string;
  area?: string;
}) {
  try {
    const response = await client.get("/ptlas", {
      params: {
        ...(role && {
          role,
        }),
        ...(area && {
          area,
        }),
      },
    });
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchClassList() {
  try {
    const response = await client.get("/timetables");
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchTimetable(className: string) {
  try {
    const response = await client.get(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function signUp(data: object) {
  try {
    const response = await client.post(`/auth/signup`, data);
    // if(!response.ok){

    // }
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function logIn(data: object) {
  try {
    console.log(data);
    const response = await client.post(`/auth/login`, data, {
      withCredentials: true,
    });
    // if(!response.ok){

    // }
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTimetable(className: string) {
  try {
    const response = await client.delete(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function initialize(body: string) {
  try {
    const response = await client.post("/students", body);
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function endOfCamp() {
  try {
    const response = await client.delete("/students");
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}
