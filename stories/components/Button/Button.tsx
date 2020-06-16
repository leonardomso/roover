import React from 'react';

import { ButtonStyled } from './Button.styles';

interface ButtonProps {
  type: string;
  name: string;
  onClick: () => void;
}

const Button = ({ type, name, onClick }: ButtonProps) => (
  <ButtonStyled type="button" onClick={onClick}>{name}</ButtonStyled>
)

export default Button;