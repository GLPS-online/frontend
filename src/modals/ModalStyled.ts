import styled from "styled-components";
import { ReactComponent as closeSvg } from "@/assets/images/close.svg";

export const ModalContainer = styled.div`
  width: 100% !important;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

export const ModalContents = styled.div`
  position: relative;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 40px;
  border-radius: 15px;
  border: 1px solid gray;
  background: white;
  z-index: 9999;
`;

export const ModalTitle = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 700;
`;

export const ModalText = styled.div`
  color: gray;
  font-size: 15px;
  font-weight: 400;
`;

export const ModalCloser = styled(closeSvg)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
