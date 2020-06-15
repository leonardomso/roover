import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Loop = () => {
  const { playing, loop, onToggle, onLoop } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>Loop</Title>
      <Description>Example using the <strong>loop</strong> prop.</Description>
      <input type="checkbox" checked={loop} onChange={onLoop} />
      <Button type="button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Loop;