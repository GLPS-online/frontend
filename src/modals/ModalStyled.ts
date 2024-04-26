import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Fields = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Label = styled.label`
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
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid red;";
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
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
  @media screen and (max-width: 620px) {
    font-size: 14px;
  }
  br {
    display: none;
    @media screen and (max-width: 620px) {
      display: inline;
    }
  }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

export const Textarea = styled.textarea<{ $isError: boolean }>`
  display: flex;
  width: 100%;
  height: 96px;
  padding: 10px 12px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid red;";
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
        return "background: red; color: white;";
      case "yellow":
        return "background: yellow; color: black;";
      case "green":
        return "background: green; color: white;";
      case "eop":
        return "background: blue; color: white;";
      case "shuttle":
        return "background: blue; color: white;";
      case "study":
        return "background: blue; color: white;";
      default:
        return "background: white; color: black;";
    }
  }}
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: 620px) {
    width: 138px;
    font-size: 14px;
  }
`;
