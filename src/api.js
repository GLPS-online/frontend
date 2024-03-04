const BASE_URL = "http://localhost:3000";

export async function fetchStudents() {
  console.log("fecth students executed");
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) {
    throw new Error("cannot download links");
  }
  const body = await res.json();
  return body;
}

export async function fetchPtlas() {
  const res = await fetch(`${BASE_URL}/ptlas`);
  if (!res.ok) {
    throw new Error("cannot download links");
  }
  const body = await res.json();
  return body;
}

export async function fetchPtlaByRole(role) {
  const res = await fetch(`${BASE_URL}/ptlas?role=${role}`);
  if (!res.ok) {
    throw new Error("cannot download links");
  }
  const body = await res.json();
  return body;
}

export async function fetchTimetable(className) {
  const res = await fetch(`${BASE_URL}/timetables/${className}`);
  if (!res.ok) {
    throw new Error("cannot download links");
  }
  const body = await res.json();
  return body;
}

export async function fetchSampleUser() {
  return "admin";
}
