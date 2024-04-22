import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  width: 520px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  @media screen and (max-width: 580px) {
    width: 351px;
  }
`;

export const Field = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: inline-flex;
  flex-direction: column;
  align-self: flex-start;
  color: var(--black-black_333236, #333236);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Input = styled.input<{ $isError: boolean }>`
  display: flex;
  margin: 8px 0;
  width: 100%;
  height: 50px;
  padding: 13px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid red;";
    }
  }}
  background: var(--white-white_FFFFFF, #fff);
`;

export const Select = styled.select<{ $isError: boolean }>`
  display: flex;
  margin: 8px 0;
  width: 100%;
  height: 50px;
  padding: 13px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid red;";
    }
  }}
  background: var(--white-white_FFFFFF, #fff);
  outline: 0px;
`;

export const Reveal = styled.img`
  cursor: pointer;
  position: absolute;
  top: 42px;
  right: 16px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const ErrorText = styled.div`
  align-self: flex-start;
  color: red;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const SubmitButton = styled.button`
  display: flex;
  margin: 22px;
  width: 100%;
  padding: 15px 0px 14px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: blue;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;
