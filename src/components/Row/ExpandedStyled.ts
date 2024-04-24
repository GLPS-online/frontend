import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Cells = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 15px;
  @media screen and (max-width: 620px) {
    gap: 5px;
  }
`;

export const Cell = styled.div`
  width: 33%;
  height: 30px;
  text-align: center;
  align-content: center;
  font-size: 18px;
  /* @media screen and (max-width: 620px) {
    height: 30px;
    font-size: 18px;
  } */
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const Link = styled.button`
  /* padding: 5px; */
  color: darkblue;
  text-decoration: underline;
  font-size: 17px;
  @media screen and (max-width: 620px) {
    font-size: 16px;
  }
`;
