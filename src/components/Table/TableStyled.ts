import styled from "styled-components";

export const TableContainer = styled.div<{ $selectable?: boolean }>`
  width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
  @media screen and (max-width: 620px) {
    max-width: 100%;
    /* min-width: 300px; */
    ${({ $selectable = false }) =>
      $selectable ? "margin-left: 30px;max-width: 90%;" : ""}
  }
`;

export const ActionBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionButton = styled.button`
  width: 40px;
  height: 20px;
  font-size: 18px;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  @media screen and (max-width: 620px) {
    gap: 5px;
  }
`;

export const SearchBarInputContainer = styled.div`
  width: 33%;
  display: flex;
  position: relative;
  align-items: center;
`;

export const SearchBarInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  border-radius: 4px;
  padding-left: 8px;
  border: solid 1px black;
  -webkit-ime-mode: active;
  -moz-ime-mode: active;
  -ms-ime-mode: active;
  ime-mode: active;
  @media screen and (max-width: 620px) {
    /* font-size: 18px; */
  }
`;

export const SearchBarSelect = styled.select`
  width: 100%;
  height: 40px;
  font-size: 20px;
  border-radius: 4px;
  padding-left: 8px;
  border: solid 1px black;
  @media screen and (max-width: 620px) {
    /* font-size: 18px; */
  }
`;

export const ActionSelect = styled.select`
  font-size: 18px;
  padding: 3px 15px 3px 5px;
  font-weight: 500;
`;

export const ClearIcon = styled.img`
  position: absolute;
  cursor: pointer;
  right: 10px;
  width: 20px;
  height: 20px;
`;

export const ActionSelector = styled.select`
  width: auto;
  height: 30px;
  font-size: 18px;
  padding: 2px 14px 2px 5px;
`;

export const RowContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CheckBox = styled.input`
  position: absolute;
  left: -33px;
  width: 25px;
  height: 25px;
`;

export const RowBox = styled.div`
  display: flex;
  width: 100%;
`;

export const EndOfList = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InformationRow = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 500;
`;
