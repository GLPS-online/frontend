import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  align-self: flex-end;
  width: 164.557px;
  height: 189.796px;
  flex-shrink: 0;
  @media screen and (max-width: 580px) {
    width: 98.734px;
    height: 113.878px;
  }
`;

export const LogoText = styled.img`
  width: 200px;
  height: 55.186px;
  flex-shrink: 0;
  @media screen and (max-width: 580px) {
    width: 119.044px;
    height: 33.112px;
  }
`;

export const WelcomeText = styled.div`
  margin-top: 14px;
  color: var(--black-black_333236, #333236);
  text-align: center;
  font-size: 19px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  margin-bottom: 30px;
`;

export const Redirectors = styled.span`
  color: var(--black-black_333236, #333236);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const RedirectLink = styled.span`
  color: purple;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`;
