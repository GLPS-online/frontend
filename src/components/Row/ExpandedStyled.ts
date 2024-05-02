import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Cells = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 15px;
  @media screen and (max-width: 620px) {
    gap: 5px;
  }
`;

export const Cell = styled.div`
  width: 33%;
  min-height: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  font-size: 18px;
  /* @media screen and (max-width: 620px) {
    height: 30px;
    font-size: 18px;
  } */
`;

export const Form = styled.form`
  width: 100%;
`;

export const Fields = styled.fieldset`
  width: 100%;
`;

export const Label = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ClubChoiceSelect = styled.select<{ $isError?: boolean }>`
  width: 100%;
  height: 100%;
  height: 30px;
  font-size: 18px;
  border-radius: 4px;
  padding-left: 8px;
  border: solid 1px var(--gray);
  ${({ $isError = false }) => {
    if ($isError) {
      return "border: 1px solid var(--red);";
    }
  }}
`;

export const ButtonsContainer = styled.div`
  /* align-self: flex-end; */
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  justify-content: flex-end;
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
  border: 1px solid var(--gray);
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
  background-color: var(--darkblue);
  color: white;
`;

export const Links = styled.div`
  width: 100%;
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const Link = styled.button`
  /* padding: 5px; */
  color: var(--darkblue);
  text-decoration: underline;
  font-size: 17px;
  @media screen and (max-width: 620px) {
    font-size: 16px;
  }
`;
