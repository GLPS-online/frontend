import styled from "styled-components";

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border: solid;
  border-radius: 5px;
`;

export const Cells = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  font-size: 20px;
`;

export const Cell = styled.div`
  width: 120px;
  text-align: center;
`;
