export function getCurrentTime() {
  const currentdate = new Date();
  const datetime =
    currentdate.getFullYear() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getDate() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
}

export function getCurrentDay() {
  const now = new Date();
  const day = now.getDay();
  // 0 for sundeay
  return day;
}
