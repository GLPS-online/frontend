import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
  ${({ $selected }) => ($selected ? "border: 3px solid blue;" : "")}
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

export const TA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 15px;
`;
