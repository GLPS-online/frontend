import styled from "styled-components";

export const RowContainer = styled.div<{ $selected: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border: solid;
  border-radius: 5px;
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
      default:
        return;
    }
  }}
`;

export const Cells = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  font-size: 20px;
`;

export const Cell = styled.div`
  width: 120px;
  text-align: center;
`;
