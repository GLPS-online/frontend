import styled from "styled-components";

export const DropDownContianer = styled.ul`
  z-index: 1;
  position: absolute;
  top: 50px;
  right: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const DropDownItem = styled.li`
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
`;
