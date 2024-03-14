function getCurrentTime() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  return [day, hour, minutes];
}

export function getCurrentTimetableIndex() {
  const [day, hour, minutes] = getCurrentTime();
  let index = 0;
  switch (day) {
    case 1:
      index += 0;
      break;
    case 2:
      index += 4;
      break;
    case 3:
      index += 8;
      break;
    case 4:
      index += 12;
      break;
    case 5:
      index += 16;
      break;
    case 6:
      index += 20;
      break;
    default:
      return null;
  }
  switch (true) {
    case hour === 9:
      index += 0;
      break;
    case hour === 10:
      index += 0;
      break;
    case hour === 11:
      index += 1;
      break;
    case hour === 12:
      index += 1;
      break;
    case (hour === 14 && minutes >= 30) ||
      hour === 15 ||
      (hour === 16 && minutes < 30):
      index += 2;
      break;
    case (hour === 16 && minutes >= 30) || (hour === 17 && minutes < 30):
      index += 3;
      break;
    default:
      return null;
  }
  if (index > 21) {
    return null;
  }
  return index;
}
