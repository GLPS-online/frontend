export function getCourse(grade: number, className: string) {
  return "초등 액티브";
}

export function isBirthday(birthdate: number) {
  const today = new Date();
  const todayStr =
    ("0" + (today.getMonth() + 1)).slice(-2) +
    ("0" + today.getDate()).slice(-2);
  const birthDateStr = ("0" + (birthdate % 10000)).slice(-4);
  return todayStr === birthDateStr;
}

export function phoneNumberAutoFormat(phoneNumber: string) {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");

  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

export function getFloorGender(floor: number) {
  switch (Math.floor(floor / 100)) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 9:
    case 10:
      return " ♂";
    case 5:
    case 6:
    case 7:
    case 8:
      return " ♀";
    default:
      return " ⚥";
  }
}
