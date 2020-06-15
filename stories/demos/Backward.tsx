import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Backward = () => {
  const { playing, onToggle, onBackward } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>onBackward</Title>
      <Description>Example using the <strong>onBackward</strong> method.</Description>
      <Button type="button" onClick={() => onBackward(15)} name="-15" />
      <Button type="button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Backward;