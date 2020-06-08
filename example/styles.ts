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

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
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

export const TextContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: max-content max-content;
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
  color: black;
`;

interface BoolenTextProps {
  prop: boolean;
}

export const BooleanText = styled.p<BoolenTextProps>`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${({ prop }) => prop ? "black" : "#B7B7B7"};
`;

export const SliderContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  grid-row-gap: 5px;
  align-items: center;
  justify-content: center;
`;