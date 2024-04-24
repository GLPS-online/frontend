import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const CancelButton = styled.button`
  width: 100px;
  height: 30px;
  padding: 10px;
  font-size: 20px;
  display: flex;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;

export const EditSaveButton = styled.button`
  width: 100px;
  height: 30px;
  padding: 10px;
  font-size: 18px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkblue;
  color: white;
`;

export const Container = styled.form`
  width: 100%;
  padding-top: 10px;
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

export const Data = styled.div`
  font-size: 18px;
  padding: 10px;
`;

export const Phone = styled.a`
  text-decoration: underline;
  color: darkblue;
`;

export const Input = styled.input<{ $isError: boolean }>`
  display: flex;
  margin-top: 6px;
  width: 100%;
  height: 30px;
  padding: 4px 10px;

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
  margin-top: 4px;
  width: 100%;
  height: 40px;
  padding: 8px 16px;

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

export const ErrorText = styled.div`
  align-self: flex-start;
  color: red;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
