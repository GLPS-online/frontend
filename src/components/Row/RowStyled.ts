import styled from "styled-components";

export const RowContainer = styled.div<{ $selected?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 2px;
  border: solid 1px black;
  border-radius: 6px;
  ${({ $selected }) => {
    switch ($selected) {
      case "default":
        return;
      case "red":
        return "background-color: red;";
      case "yellow":
        return "background-color: yellow;";
      case "green":
        return "background-color: green;";
      case "shuttle":
        return "background-color: orange;";
      case "study":
        return "background-color: aqua;";
      case "eop":
        return "background-color: pink;";
      case "attendance":
        return "background-color: gray;";
      default:
        return;
    }
  }}
`;

export const Cells = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 620px) {
    gap: 5px;
  }
`;

export const Cell = styled.div`
  width: 33%;
  height: 30px;
  font-size: 20px;
  text-align: center;
  align-content: center;
  @media screen and (max-width: 620px) {
    height: auto;
    min-height: 30px;
    /* font-size: 18px; */
  }
`;
