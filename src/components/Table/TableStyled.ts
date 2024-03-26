import styled from "styled-components";
import { ReactComponent as ClearSvg } from "../../assets/icons/clear.svg";

export const TableContainer = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
`;

export const ActionBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

export const SearchBarInputContainer = styled.div`
  width: 33%;
  display: flex;
  position: relative;
  align-items: center;
`;

export const SearchBarInput = styled.input`
  width: 100%;
  font-size: 20px;
  border: solid;
  -webkit-ime-mode: active;
  -moz-ime-mode: active;
  -ms-ime-mode: active;
  ime-mode: active;
`;

export const ClearIcon = styled(ClearSvg)`
  position: absolute;
  cursor: pointer;
  right: 10px;
  width: 20px;
  height: 20px;
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
