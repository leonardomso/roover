import styled, { css } from 'styled-components';

interface ButtonProps {
  disabled?: boolean;
};

export const ButtonStyled = styled.button<ButtonProps>`
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