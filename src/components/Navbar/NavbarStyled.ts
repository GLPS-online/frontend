import styled from "styled-components";

import { ReactComponent as ArrowDownSvg } from "@/assets/icons/arrowDown.svg";
import { ReactComponent as ArrowUpSvg } from "@/assets/icons/arrowUp.svg";

export const NavbarContainer = styled.nav`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 20px 200px;
`;

export const ArrowDownButton = styled(ArrowDownSvg)`
  width: 25px;
  height: 25px;
`;

export const ArrowUpButton = styled(ArrowUpSvg)`
  width: 25px;
  height: 25px;
`;
