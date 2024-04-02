import styled from "styled-components";

import { ReactComponent as EditSvg } from "@/assets/icons/edit.svg";
import { ReactComponent as SaveSvg } from "@/assets/icons/save.svg";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const EditButton = styled(EditSvg)`
  width: 16px;
  height: 16px;
`;

export const SaveButton = styled(SaveSvg)`
  width: 16px;
  height: 16px;
`;

export const Button = styled.button`
  width: 16px;
  height: 16px;
`;
