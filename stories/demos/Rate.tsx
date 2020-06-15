import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import Slider from '../components/Slider/Slider';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Rate = () => {
  const { playing, rate, duration, onToggle, onRate } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>Rate</Title>
      <Description>Example using the <strong>rate</strong> prop.</Description>
      <Slider min={0.4} max={5.0} step={0.1} value={rate} onChange={onRate} />
      <Button type="button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Rate;