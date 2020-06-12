import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerContainer = styled.main`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, max-content);
  grid-row-gap: 30px;
  align-items: center;
  justify-content: center;
`;

export const RehawkTitle = styled.h1`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  text-align: center;
  letter-spacing: -0.03em;
`;

export const ButtonsContainer = styled.div`
  width: auto;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1fr;
  grid-column-gap: 10px;
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  align-self: center;
  justify-self: center;
`;

interface ButtonProps {
  disabled?: boolean;
};

export const Button = styled.button<ButtonProps>`
  width: 65px;
  height: 30px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: #FFFFFF;
  outline: none;

  ${({ disabled }) =>
    disabled &&
    css`
      background: #EAEAEA;
      cursor: not-allowed;
      outline: none;
    `};
`;

export const InputsContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-rows: repeat(auto-fill, max-content);
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  align-items: center;
  justify-content: center;
  grid-row: 3 / 4;
  grid-column: 1 / 2;
`;

export const InputContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: minmax(50px, max-content) max-content;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.h1`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
`;

export const StatesContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, max-content);
  grid-column-gap: 30px;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
`; 

export const StateTitle = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #666666;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: flex-start;
  align-self: center;
`;

export const StatesLeftContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, max-content);
  grid-row-gap: 10px;
  align-items: center;
  justify-content: center;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`;

export const StatesRightContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, max-content);
  grid-row-gap: 10px;
  align-items: center;
  justify-content: center;
  grid-row: 2 / 3;
  grid-column: 2 / 3;;
`;


export const StateContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: minmax(50px, max-content) max-content;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const StateProperty = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

export const StateValue = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;