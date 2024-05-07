import client from ".";

export const fetchMeals = async (dayIndex: number) => {
  const response = await client.get("/meals", {});
  const result = response.data;
  return result;
};

export const voteMeal = async (mealId: string) => {
  const response = await client.post(`/meals/vote/${mealId}`);
  const result = response.data;
  return result;
};

export const createMeal = async (
  dayIndex: number,
  timeIndex: number,
  menu: string
) => {
  const response = await client.post("/meals", { dayIndex, timeIndex, menu });
  const result = response.data;
  return result;
};

export const deleteMeals = async () => {
  const response = await client.delete("/meals");
  const result = response.data;
  return result;
};
