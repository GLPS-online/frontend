import styled from "styled-components";
import { ReactComponent as PhoneSvg } from "../../../assets/images/phone.svg";

export const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const Wave = styled.div`
  font-size: 16px;
  color: gray;
  align-self: flex-end;
`;

export const Name = styled.div`
  font-size: 20px;
  color: black;
`;

export const PhoneImg = styled(PhoneSvg)`
  width: 16px;
  height: 16px;
  margin-left: 3px;
`;
