import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Fields = styled.fieldset`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  @media screen and (max-width: 620px) {
    font-size: 16px;
  }
`;

export const Select = styled.select<{ $isError: boolean }>`
  display: flex;
  margin: 8px 0;
  width: 100%;
  height: 48px;
  padding: 10px 12px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid var(--red);";
    }
  }}
  font-size: 16px;
  @media screen and (max-width: 620px) {
    font-size: 14px;
  }
`;

export const CheckboxArea = styled.div<{ $isError: boolean }>`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  @media screen and (max-width: 620px) {
    font-size: 14px;
  }
`;

export const ConfirmText = styled.label`
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
  br {
    display: none;
    @media screen and (max-width: 620px) {
      display: inline;
    }
  }
`;

export const Checkbox = styled.input`
  width: 25px;
  height: 25px;
`;

export const Textarea = styled.textarea<{ $isError: boolean }>`
  display: flex;
  width: 100%;
  height: 96px;
  padding: 10px 12px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid var(--red);";
    }
  }}
  font-size: 16px;
  @media screen and (max-width: 620px) {
    font-size: 14px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  @media screen and (max-width: 620px) {
    justify-content: center;
  }
`;

export const Button = styled.button<{ $color?: string }>`
  width: 120px;
  height: 48px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  ${({ $color }) => {
    switch ($color) {
      case "red":
        return "background: #F60000; color: white;";
      case "yellow":
        return "background: #FFEE00; color: black;";
      case "green":
        return "background: #4DE94C;";
      case "eop":
        return "background: var(--darkblue); color: white;";
      case "shuttle":
        return "background: var(--darkblue); color: white;";
      case "study":
        return "background: var(--darkblue); color: white;";
      default:
        return "background: white;";
    }
  }}
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: 620px) {
    width: 130px;
    font-size: 14px;
  }
`;
