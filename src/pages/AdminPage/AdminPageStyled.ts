import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const Header = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

export const Content = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid black;
  padding: 5px;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 30px;
  border: solid 1px black;
`;

export const Textarea = styled.textarea`
  width: 100%;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: blue;
  color: white;
`;

export const DangerButton = styled(Button)`
  background-color: red;
`;
