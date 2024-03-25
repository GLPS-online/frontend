import styled from "styled-components";

export const TableContainer = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
`;

export const ActionBar = styled.div<{ $visible: boolean }>`
  position: relative;
  display: ${({ $visible }) => ($visible ? "flex;" : "none;")};
  justify-content: space-between;
  align-items: center;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

export const SearchBarInput = styled.input`
  width: 33%;
  font-size: 20px;
  border: solid;
  -webkit-ime-mode: active;
  -moz-ime-mode: active;
  -ms-ime-mode: active;
  ime-mode: active;
`;

export const RowContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CheckBox = styled.input`
  position: absolute;
  left: -30px;
  width: 25px;
  height: 25px;
`;

export const EndOfList = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
