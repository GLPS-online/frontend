import styled from "styled-components";

export const TableContainer = styled.div<{ $selectable?: boolean }>`
  width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
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
  border: solid 1px black;
  -webkit-ime-mode: active;
  -moz-ime-mode: active;
  -ms-ime-mode: active;
  ime-mode: active;
  @media screen and (max-width: 620px) {
    /* font-size: 18px; */
  }
`;

export const ClearIcon = styled.img`
  position: absolute;
  cursor: pointer;
  right: 10px;
  width: 20px;
  height: 20px;
`;

export const ActionSelector = styled.select`
  height: 30px;
  font-size: 18px;
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
  width: 28px;
  height: 28px;
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
