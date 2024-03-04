import styled from "styled-components";

export const TimetableContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(6, 100px);
`;

export const TimetableItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-size: 20px;
`;
