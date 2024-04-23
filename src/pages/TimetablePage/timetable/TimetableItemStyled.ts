import styled from "styled-components";

export const Item = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin: 1px;
  border: 1px solid black;
  ${({ $selected }) => ($selected ? "border: 3px solid blue;" : "")}
`;

export const Subject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  @media screen and (max-width: 620px) {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const Location = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 13px;
  font-weight: 500;
  @media screen and (max-width: 620px) {
    /* font-size: 10px; */
    /* font-weight: 600; */
  }
`;

export const TA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 13px;
  font-weight: 500;
  @media screen and (max-width: 620px) {
    /* font-size: 10px; */
    /* font-weight: 600; */
  }
`;
