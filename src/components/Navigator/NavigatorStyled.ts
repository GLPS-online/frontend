import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Link = styled.button`
  padding: 5px;
  color: darkblue;
  text-decoration: underline;
  font-size: 16px;
  /* @media screen and (max-width: 620px) {
    font-size: 16px;
  } */
`;
