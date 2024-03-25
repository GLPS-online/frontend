import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(6, 100px);
`;
