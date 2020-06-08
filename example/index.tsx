import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useHawk } from "../src"

import { Button, TextContainer, Text, BooleanText, SliderContainer } from "./styles";

const src =
  "https://traffic.omny.fm/d/clips/a858b0a5-e5e6-4a14-9717-a70b010facc1/7d7ad78a-afa7-4af6-b0ab-a7bf00d33acc/af860e31-b511-4f3b-8eb7-a95101178792/audio.mp3?utm_source=Podcast&in_playlist=63b76787-ee2e-44cd-86e1-a8c500bf6f64&t=1536141755";

const App = () => {
  const {
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    volume,
    rate,
    muted,
    duration,
    position,
    onToggle, 
    onPlay, 
    onPause,
    onStop,
    onMute,
    onPosition,
    onVolume,
    onRate
  } = useHawk({
    src,
    autoplay: false
  });

  return (
    <div>
      <TextContainer>
        <Text>Ready: </Text>
        <BooleanText prop={ready}>{ready ? "true" : "false"}</BooleanText>
      </TextContainer>

      <TextContainer>
        <Text>Loading: </Text>
        <BooleanText prop={loading}>{loading ? "true" : "false"}</BooleanText>
      </TextContainer>

      <TextContainer>
        <Text>Playing: </Text>
        <BooleanText prop={playing}>{playing ? "true" : "false"}</BooleanText>
      </TextContainer>

      <TextContainer>
        <Text>Paused: </Text>
        <BooleanText prop={paused}>{paused ? "true" : "false"}</BooleanText>
      </TextContainer>

      <TextContainer>
        <Text>Stopped: </Text>
        <BooleanText prop={stopped}>{stopped ? "true" : "false"}</BooleanText>
      </TextContainer>

      <TextContainer>
        <Text>Muted: </Text>
        <BooleanText prop={muted}>{muted ? "true" : "false"}</BooleanText>
      </TextContainer>

      <TextContainer>
        <Text>Duration: {duration}</Text>
      </TextContainer>

      <SliderContainer>
        <Text>Position: {position}</Text>

        <input 
          type="range"
          min={0}
          max={duration}
          value={position}
          step={0.1}
          onChange={onPosition} 
        />
      </SliderContainer>

      <SliderContainer>
        <Text>Volume: {volume}</Text>

        <input 
          type="range"
          min={0}
          max={1}
          value={volume}
          step={0.1}
          onChange={onVolume} 
        />
      </SliderContainer>

      <SliderContainer>
        <Text>Rate: {rate}</Text>

        <input 
          type="range"
          min={0}
          max={4.0}
          value={rate}
          step={0.1}
          onChange={onRate} 
        />
      </SliderContainer>

      <SliderContainer>
        <Text>Mute</Text>

        <input type="checkbox" checked={muted} onChange={onMute} />
      </SliderContainer>

      <TextContainer>
        <Text>Error: {error ? error : ""}</Text>
      </TextContainer>

      <Button type="button" onClick={onPlay} disabled={!ready}>Play</Button>
      <Button type="button" onClick={onPause} disabled={!ready}>Pause</Button>
      <Button type="button" onClick={onStop} disabled={!ready}>Stop</Button>
      <Button type="button" onClick={onToggle} disabled={!ready}>Toggle</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
