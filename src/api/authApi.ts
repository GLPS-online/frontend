import client from "./";

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

// export async function me() {
//   try {
//     const response = await client.get(`/auth/me`);
//     return response.data;
//   } catch (err: any) {
//     console.log(err.response?.status);
//     console.log(err.response?.data.msg);
//   }
// }
