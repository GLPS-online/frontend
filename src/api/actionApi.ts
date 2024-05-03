import client from ".";

export const fetchCards = async (type?: string) => {
  const response = await client.get(`/actions/card`);
  const result = response.data;
  return result;
};

export const postCard = async (data: {
  students: string[];
  type: string;
  reason: string;
}) => {
  const response = await client.post(`/actions/card`, data);
  const result = response.data;
  return result;
};

export const deleteCard = async (id: string) => {
  const response = await client.delete(`/actions/card/${id}`);
  const result = response.data;
  return result;
};

export const fetchEops = async () => {
  const response = await client.get("/actions/eop");
  const result = response.data;
  return result;
};

export const postEop = async (data: { students: string[]; reason: string }) => {
  const response = await client.post(`/actions/eop`, data);
  const result = response.data;
  return result;
};

export const approveEop = async (id: string) => {
  const response = await client.put(`/actions/eop/${id}`);
  const result = response.data;
  return result;
};

export const deleteEop = async (id: string) => {
  const response = await client.delete(`/actions/eop/${id}`);
  const result = response.data;
  return result;
};
