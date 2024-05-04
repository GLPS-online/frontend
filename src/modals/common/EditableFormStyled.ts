import styled from "styled-components";

export const InfoContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Fields = styled.fieldset`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  gap: 12px;
`;

export const Field = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--lightgray);
  padding: 10px;
  border-radius: 6px;
`;

export const ReadOnlyField = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--lightgray);
  padding: 5px 10px;
  border-radius: 6px;
`;

export const Label = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-self: flex-start;
  color: var(--grayblack);
  font-size: 17px;
  @media screen and (max-width: 620px) {
    font-size: 16px;
  }
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-wrap: break-word;
`;

export const Data = styled.div`
  font-size: 18px;
  padding: 10px 0;
  @media screen and (max-width: 620px) {
    font-size: 17px;
    padding: 7px 0;
  }

  word-wrap: break-word;
`;

export const ReadOnlyData = styled.div`
  font-size: 18px;
  padding: 10px 0;
  @media screen and (max-width: 620px) {
    font-size: 17px;
    padding: 7px 0;
  }
  word-wrap: break-word;
`;

export const Phone = styled.span`
  text-decoration: underline;
  color: var(--darkblue);
  @media screen and (max-width: 620px) {
    font-size: 14.5px;
  }
  word-wrap: break-word;
`;

export const Link = styled.span`
  text-decoration: underline;
  color: var(--darkblue);
  word-wrap: break-word;
`;

export const Input = styled.input<{ $isError?: boolean }>`
  display: flex;
  margin-top: 8px;
  width: 100%;
  height: 30px;
  padding: 5px 10px;

  font-size: 17px;
  @media screen and (max-width: 620px) {
    margin-top: 4px;
    font-size: 15px;
  }
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid var(--red);";
    }
  }}
`;

export const Select = styled.select<{ $isError?: boolean }>`
  display: flex;
  margin-top: 8px;
  width: 100%;
  height: 30px;
  padding: 5px 10px;

  font-size: 17px;
  @media screen and (max-width: 620px) {
    margin-top: 4px;
    font-size: 15px;
  }
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  ${({ $isError }) => {
    if ($isError) {
      return "border: 1px solid var(--red);";
    }
  }}
  outline: 0px;
`;

export const ErrorText = styled.div`
  align-self: flex-start;
  color: var(--red);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
