import * as React from "react";

import { SliderContainer } from "./Slider.styles";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (event: any) => void;
}

const Slider = ({
  min,
  max,
  value,
  step,
  onChange,
}: SliderProps) => (
  <SliderContainer>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={onChange}
    />
  </SliderContainer>
);

export default Slider;
