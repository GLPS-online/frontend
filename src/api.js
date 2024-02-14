import mock from "./mock.js";

// const BASE_URL = "";

export async function fetchSampleStudents() {
  setTimeout(() => {
    console.log("fetched student data");
  }, 500);
  return mock;
}

export async function fetchSampleUser() {
  return "admin";
}
