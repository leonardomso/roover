import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import Slider from '../components/Slider/Slider';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Volume = () => {
  const { playing, volume, duration, onToggle, onVolume } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>Volume</Title>
      <Description>Example using the <strong>volume</strong> prop.</Description>
      <Slider min={0} max={1.0} step={0.1} value={volume} onChange={onVolume} />
      <Button type="button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Volume;