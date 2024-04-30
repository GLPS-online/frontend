import styled from "styled-components";


export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const ButtonsContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const CancelButton = styled.button`
  width: 90px;
  height: 30px;
  padding: 10px;
  font-size: 14px;
  display: flex;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;

export const EditSaveButton = styled.button`
  width: 90px;
  height: 30px;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkblue;
  color: white;
`;

export const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 10px;
`;

export const Fields = styled.fieldset`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;

export const Field = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 6px;
`;

export const ReadOnlyField = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 6px;
`;

export const Label = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-self: flex-start;
  color: var(--black-black_333236, #333236);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Data = styled.div`
  font-size: 18px;
  padding: 10px 0;
`;

export const ReadOnlyData = styled.div`
  font-size: 18px;
  padding: 5px 0;
`;

export const Phone = styled.a`
  text-decoration: underline;
  color: darkblue;
`;

export const Input = styled.input<{ $isError: boolean }>`
  display: flex;
  margin-top: 8px;
  width: 100%;
  height: 30px;
  padding: 5px 10px;

  font-size: 17px;
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
  margin-top: 8px;
  width: 100%;
  height: 30px;
  padding: 5px 10px;

  font-size: 17px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid red;";
    }
  }}
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
