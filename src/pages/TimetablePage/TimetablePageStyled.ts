import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const ClassSelect = styled.select`
  font-size: 16px;
  font-weight: 500;
`;

export const InformationRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InformationItem = styled.div`
  font-size: 16px;
`;

export const Days = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const Day = styled.div`
  width: 16.6%;
  text-align: center;
  font-size: 14px;
`;

export const Link = styled.button`
  padding: 5px;
  color: darkblue;
  text-decoration: underline;
  font-size: 15px;
  @media screen and (max-width: 620px) {
    font-size: 13px;
  }
`;
