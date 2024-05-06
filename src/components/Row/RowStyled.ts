import styled from "styled-components";

export const RowContainer = styled.div<{
  $selected?: string;
  $disabled?: boolean;
}>`
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
      case "attendance":
        return "background-color: var(--lightgray);";
      case "eop":
        return "background-color: #e79aff;";
      case "green":
        return "background-color: #4DE94C;";
      case "yellow":
        return "background-color: #FFEE00;";
      case "red":
        return "background-color: #F60000;";
      case "study":
        return "background-color: #FF8C00;";
      case "shuttle":
        return "background-color: #00A6ED;";
      default:
        return;
    }
  }}
  ${({ $disabled = false }) => {
    if ($disabled) {
      return "opacity: 0.3;";
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 30px;
  font-size: 20px;
  text-align: center;
  // align-content: center;
  @media screen and (max-width: 620px) {
    height: auto;
    min-height: 30px;
    /* font-size: 18px; */
  }
`;

export const NoteArea = styled.div`
  width: 100%;
  padding: 7px 17px 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  line-height: 1.5;
`;

export const Space = styled.span`
  @media screen and (max-width: 360px) {
    display: none;
  }
`;

export const Cake = styled.span`
  @media screen and (max-width: 620px) {
    font-size: 15px;
  }
`;
