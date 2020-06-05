import styled, { css } from "styled-components";

interface ButtonProps {
  disabled?: boolean;
};

export const Button = styled.button<ButtonProps>`
  width: 90px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  outline: none;

  ${({ disabled }) =>
    disabled &&
    css`
      background: #EAEAEA;
      cursor: not-allowed;
      outline: none;
    `};
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 40px;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: black;
  background: white;
  border: 1px solid #EAEAEA;
  box-sizing: border-box;
  border-radius: 5px;
  text-indent: 20px;
  outline: none;
  letter-spacing: normal;
  word-spacing: normal;

  &:focus {
    border: 1px solid black;
  }

  ::-webkit-input-placeholder,
  ::-moz-placeholder,
  :-ms-input-placeholder,
  :-moz-placeholder,
  ::placeholder {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #999999;
    text-indent: 20px;
  }
`;