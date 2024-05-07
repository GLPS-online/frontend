import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const DateSelectContainer = styled.div`
  width: 100%;
  height: 40px;

  margin-top: 20px;
  border-radius: 40px;
  background-color: #ebecf5;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 5px;
  gap: 5px;
`;

export const DateElement = styled.div<{ $selected?: boolean; $value?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  height: 35px;
  border-radius: 35px;
  cursor: pointer;
  ${({ $selected }) => $selected && "background-color: white;"}
  ${({ $selected, $value }) =>
    $selected
      ? $value === "토"
        ? "color: darkblue;"
        : $value === "일"
        ? "color: var(--red);"
        : "color: #555869;"
      : "color: gray;"}
`;

export const MealContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid var(--lightgray);
  border-radius: 12px;
  gap: 10px;
  width: 100%;
`;

export const MealTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
`;

export const VoteButton = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 2px 8px;
  border-radius: 32px;
  background: rgba(0, 0, 0, 0.34);
  &:hover {
    background: rgba(0, 0, 0, 0.54);
  }
  font-size: 14px;
  font-weight: 400;
  color: white;
  cursor: pointer;
`;

export const MenuArea = styled.div`
  font-size: 16px;
  line-height: 170%;
  font-weight: 400;
  color: #555869;
  sup {
    font-size: 10px;
    vertical-align: super;
  }
`;

export const AllergyInfo = styled.div`
  font-size: 12px;
  font-style: italic;
  color: gray;
  margin-top: 10px;
`;
