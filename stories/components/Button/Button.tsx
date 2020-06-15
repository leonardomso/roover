import React from 'react';

import { ButtonStyled } from './Button.styles';

interface ButtonProps {
  type: string;
  name: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({type, name, onClick }) => (
  <ButtonStyled type="button" onClick={onClick}>{name}</ButtonStyled>
)

export default Button;