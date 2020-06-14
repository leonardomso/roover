import React from 'react';
import { useRehawk } from '../../src/';

import Button from '../components/Button/Button';
import { ExampleContainer, Title, Description } from '../components/styles';

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Mute = () => {
  const { playing, muted, onToggle, onMute } = useRehawk({
    src
  });

  return (
    <ExampleContainer>
      <Title>Mute</Title>
      <Description>Example using the <strong>muted</strong> prop.</Description>
      <input type="checkbox" checked={muted} onChange={onMute} />
      <Button type="button" onClick={onToggle} name={playing ? `Pause` : `Play`} />
    </ExampleContainer>
  )
};

export default Mute;