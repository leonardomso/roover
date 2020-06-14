import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Simple = () => {
  const { playing, onToggle } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>Simple</Title>
      <Description>Simple example working of Rehawk.</Description>
      <Button type="Button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Simple;