import styled from "styled-components";

export const TimetableContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(6, 100px);
`;

export const TimetableItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
`;

export const Subject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const Location = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 15px;
`;
