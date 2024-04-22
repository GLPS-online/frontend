import styled from "styled-components";

export const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid lightgray;
  padding: 3px;
  border-radius: 3px;
`;

export const Wave = styled.span<{ $forTimetable: boolean }>`
  ${({ $forTimetable }) =>
    $forTimetable ? "font-size: 12px;" : "font-size: 16px;"}
  color: gray;
  align-self: flex-end;
  @media screen and (max-width: 620px) {
    ${({ $forTimetable }) =>
      $forTimetable ? "font-size: 10px;" : "font-size: 14px;"}
  }
`;

export const Name = styled.span<{ $forTimetable: boolean }>`
  ${({ $forTimetable }) =>
    $forTimetable ? "font-size: 15px;" : "font-size: 20px;"}
  color: black;
  @media screen and (max-width: 620px) {
    ${({ $forTimetable }) =>
      $forTimetable ? "font-size: 13px;" : "font-size: 18px;"}
  }
`;

export const Division = styled.span<{ $forTimetable: boolean }>`
  ${({ $forTimetable }) =>
    $forTimetable ? "font-size: 14.25px;" : "font-size: 19px;"}
  letter-spacing: -0.05px;
  color: black;
  @media screen and (max-width: 620px) {
    ${({ $forTimetable }) =>
      $forTimetable ? "font-size: 12.5px;" : "font-size: 17px;"}
  }
`;
