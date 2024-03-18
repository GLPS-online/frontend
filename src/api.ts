import axios from "axios";
const BASE_URL = "http://localhost:3000";

const client = axios.create({
  baseURL: BASE_URL,
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
    alert(err);
  }
}

export async function fetchStudent(id: string) {
  try {
    const response = await client.get(`/students/${id}`);
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}
export async function updateStudent(id: string, body: Object) {
  try {
    const response = await client.put(`/students/${id}`, body);
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}

export async function fetchPtlas() {
  try {
    const response = await client.get("/ptlas");
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}

export async function fetchPtla({
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
    alert(err);
  }
}

export async function fetchTimetables() {
  try {
    const response = await client.get("/timetables");
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}

export async function fetchTimetable(className: string) {
  try {
    const response = await client.get(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
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
    alert(err);
  }
}

export async function deleteTimetable(className: string) {
  try {
    const response = await client.delete(`/timetables/${className}`);
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}

export async function initialize(body: string) {
  try {
    const response = await client.post("/students", body);
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}

export async function endOfCamp() {
  try {
    const response = await client.delete("/students");
    const result = response.data;
    return result;
  } catch (err) {
    alert(err);
  }
}

export async function fetchSampleUser() {
  return "admin";
}
