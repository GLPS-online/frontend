import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin: 0 auto;
  @media screen and (max-width: 620px) {
    width: 100%;
    padding: 10px;
  }
`;

export const UserArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const menuOpen = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
