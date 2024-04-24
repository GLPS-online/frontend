import styled from "styled-components";

export const Logo = styled.div`
  width: 100%;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 35px;
  font-weight: 800;
  color: darkblue;
  cursor: pointer;
`;

export const Redirectors = styled.span`
  padding-bottom: 50px;
  color: var(--black-black_333236, #333236);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const RedirectLink = styled.span`
  color: purple;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`;

export const Container = styled.form`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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
  font-size: 17px;
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

  font-size: 16px;
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

  font-size: 16px;
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
  background: darkblue;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;
