import client from ".";

export async function fetchCards(type: string) {
  const response = await client.get(`/actions/card`, { params: { type } });
  const result = response.data;
  return result;
}

export async function postCard(data: {
  students: string[];
  type: string;
  reason: string;
}) {
  const response = await client.post(`/actions/card`, data);
  const result = response.data;
  return result;
}

export async function deleteCard(id: string) {
  const response = await client.delete(`/actions/card/${id}`);
  const result = response.data;
  return result;
}

export async function fetchEops() {
  const response = await client.get("/actions/eop");
  const result = response.data;
  return result;
}

export async function postEop(data: { students: string[]; reason: string }) {
  const response = await client.post(`/actions/eop`, data);
  const result = response.data;
  return result;
}

export async function approveEop(id: string) {
  const response = await client.put(`/actions/eop/${id}`);
  const result = response.data;
  return result;
}

export async function deleteEop(id: string) {
  const response = await client.delete(`/actions/eop/${id}`);
  const result = response.data;
  return result;
}

export async function fetchShuttles(date: string) {
  const response = await client.get("/actions/shuttle", { params: { date } });
  const result = response.data;
  return result;
}

export async function postShuttle(data: {
  students: string[];
  date: string;
  time: string;
  departure: string;
  destination: string;
}) {
  const response = await client.post(`/actions/shuttle`, data);
  const result = response.data;
  return result;
}

export async function deleteShuttle(id: string) {
  const response = await client.delete(`/actions/shuttle/${id}`);
  const result = response.data;
  return result;
}

export async function fetchStudies(date: string) {
  const response = await client.get("/actions/study", { params: { date } });
  const result = response.data;
  return result;
}

export async function postStudy(data: { students: string[]; date: string }) {
  const response = await client.post(`/actions/study`, data);
  const result = response.data;
  return result;
}

export async function deleteStudy(id: string) {
  const response = await client.delete(`/actions/study/${id}`);
  const result = response.data;
  return result;
}
