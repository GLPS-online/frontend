import client from ".";

export const searchClubPAs = async (clubName: string) => {
  const response = await client.get(`/clubs/users/${clubName}`);
  const result = response.data;
  return result;
};

export const fetchClubStudents = async () => {
  const response = await client.get("/clubs/students");
  const result = response.data;
  return result;
};
