import client from "./";
// export async function fetchClassList() {
//   try {
//     const response = await client.get("/timetables");
//     const result = response.data;
//     return result;
//   } catch (err: any) {
//     console.log(err.response?.status);
//     console.log(err.response?.data.msg);
//   }
// }

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
