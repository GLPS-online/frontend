import mock from "./mock.js";
const BASE_URL = "http://localhost:3000";

// export async function fetchSampleStudents() {
//   setTimeout(() => {
//     console.log("fetched student data");
//   }, 500);
//   return mock;
// }

export async function fetchStudents() {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) {
    throw new Error("cannot download links");
  }
  const body = await res.json();
  console.log(body);
  return body;
}

export async function fetchSampleUser() {
  return "admin";
}
