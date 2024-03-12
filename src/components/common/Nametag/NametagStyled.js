import styled from "styled-components";
export const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const Wave = styled.span`
  ${({ $forTimetable }) =>
    $forTimetable ? "font-size: 12px;" : "font-size: 16px;"}

  color: gray;
  align-self: flex-end;
`;

export const Name = styled.span`
  ${({ $forTimetable }) =>
    $forTimetable ? "font-size: 15px;" : "font-size: 20px;"}
  color: black;
`;

export const Division = styled.span`
  ${({ $forTimetable }) =>
    $forTimetable ? "font-size: 14.25px;" : "font-size: 19px;"}
  letter-spacing: -0.05px;
  color: black;
`;
