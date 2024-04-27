import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 640px) {
    min-height: 0;
  }
`;
