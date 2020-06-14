import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import Slider from '../components/Slider/Slider';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Seek = () => {
  const { playing, seek, duration, onToggle, onSeek } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>Seek</Title>
      <Description>Example using the <strong>seek</strong> prop.</Description>
      <Slider min={0} max={duration} step={0.1} value={seek} onChange={onSeek} />
      <Button type="Button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Seek;