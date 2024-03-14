export interface classInfo {
  subject: string;
  location: string;
}

export interface Timetable {
  className: string;
  advisor: string;
  office: string;
  table: classInfo[];
}
