import styled from "styled-components";

export const Background = styled.div`
  width: 120%;
  height: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  width: 540px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background-color: white;
  border-radius: 8px;
  @media screen and (max-width: 620px) {
    width: 320px;
    padding: 20px 24px;
    gap: 20x;
  }
`;

export const Title = styled.h2`
  color: #333236;
  font-size: 24px;
  font-weight: 700;
  @media screen and (max-width: 620px) {
    font-size: 20px;
  }
`;
