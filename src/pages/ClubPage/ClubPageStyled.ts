import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const ClubSelect = styled.select`
  font-size: 18px;
  padding: 3px 12px 3px 5px;
  font-weight: 500;
`;

export const InformationRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InformationItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;