import styled, { keyframes, css } from "styled-components";
import { ReactComponent as CompletedSvg } from "../../assets/icons/completed.svg";
import { ReactComponent as CloseSvg } from "../../assets/icons/close.svg";

const slideUp = keyframes`
  from {
    transform: translateY(100vh) translateX(-50%);
  }
  to {
    transform: translateY(0) translateX(-50%);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
  }
  to {
    transform: translateY(100vh) translateX(-50%);
  }
`;

export const ToastContainer = styled.div<{ $isShown: boolean }>`
  position: fixed;
  width: 524px;
  height: 64px;
  bottom: 32px;
  left: 50%;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
  padding: 19px 30px;
  display: flex;
  animation: ${(props) =>
    props.$isShown
      ? css`
          ${slideUp} 0.5s forwards
        `
      : css`
          ${slideDown} 2s forwards
        `};
  z-index: 999;

  @media screen and (max-width: 1199px) {
    bottom: 100px;
  }

  @media screen and (max-width: 767px) {
    width: 280px;
    bottom: 88px;
  }
`;

const IconStyle = css`
  margin-right: 8px;
  width: 24px;
  height: 24px;
`;

export const CompletedIcon = styled(CompletedSvg)`
  ${IconStyle}
`;

export const CloseIcon = styled(CloseSvg)`
  width: 24px;
  height: 24px;
  margin-left: auto;
  cursor: pointer;
`;

export const Message = styled.span`
  align-items: flex-start;
  color: var(--white);
  font-size: var(--font-16);
  font-weight: var(--font-regular);
  line-height: 26px;
  letter-spacing: -0.16px;
`;
