import styled from "styled-components";

const StyledSpinner = styled.svg`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  align-self: center;
  animation: rotate 2s linear infinite;
  /* margin: -25px 0 0 -25px; */
  margin: 25px;
  width: 40px;
  height: 40px;

  & .path {
    stroke: darkblue;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export function SmallSpinner() {
  return (
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="10"
        fill="none"
        strokeWidth="2"
      />
    </StyledSpinner>
  );
}

export default function Spinner() {
  return (
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </StyledSpinner>
  );
}
