import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  align-self: center;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(4, 80px);
  grid-template-columns: repeat(6, 16.6%);

  @media screen and (max-width: 620px) {
    grid-template-rows: repeat(4, 70px);
  }
`;
