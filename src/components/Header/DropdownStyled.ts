import styled from "styled-components";

export const DropDownContianer = styled.ul`
  z-index: 2;
  position: absolute;
  top: 30px;
  right: 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 2px 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
`;

export const DropDownItem = styled.li`
  z-index: 1;
  display: flex;
  align-items: cetner;
  width: 150px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  /* font-weight: 500; */
  @media screen and (max-width: 620px) {
    height: 38px;
    /* font-size: 14px; */
  }
`;
