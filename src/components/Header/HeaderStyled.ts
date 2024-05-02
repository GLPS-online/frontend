import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 0;
  margin: 0 auto;
  @media screen and (max-width: 620px) {
    width: 100%;
    padding: 10px 0;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border: solid 0.5px lightblue;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
`;

export const BigText = styled.span`
  font-size: 35px;
  font-weight: 800;
  color: var(--darkblue);
`;

export const SmallText = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

export const UserArea = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  font-size: 16px;
`;

export const menuOpen = styled.img`
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-left: 2px;
`;
