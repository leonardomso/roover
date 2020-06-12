import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useRehawk, RehawkProvider } from "../src"

import { 
  Container, 
  InnerContainer, 
  RehawkTitle,
  ButtonsContainer,
  Button, 
  InputsContainer,
  InputContainer,
  Text,
  StatesContainer,
  StateTitle,
  StatesLeftContainer,
  StatesRightContainer,
  StateContainer,
  StateProperty,
  StateValue
} from "./styles";

const src =
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Player = () => {
  const {
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    duration,
    seek,
    volume,
    muted,
    rate,
    loop,
    load,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
    onLoop,
    onVolume,
    onRate,
    onSeek
  } = useRehawk({
    src,
    preload: true,
    autoplay: false,
    volume: 0.5,
    muted: false,
    loop: false,
    rate: 1.0
  });

  return (
    <Container>
      <InnerContainer>
        <RehawkTitle>Rehawk</RehawkTitle>

        <ButtonsContainer>
        <Button type="button" onClick={() => load({ src })} disabled={!load}>Load</Button>
          <Button type="button" onClick={onPlay} disabled={!ready}>Play</Button>
          <Button type="button" onClick={onPause} disabled={!ready}>Pause</Button>
          <Button type="button" onClick={onStop} disabled={!ready}>Stop</Button>
          <Button type="button" onClick={onToggle} disabled={!ready}>Toggle</Button>
        </ButtonsContainer>

        <InputsContainer>
          <InputContainer>
            <Text>Seek</Text>
            <input 
              type="range"
              min={0}
              max={duration}
              value={seek}
              step={0.1}
              onChange={onSeek} 
            />
          </InputContainer>

          <InputContainer>
            <Text>Volume</Text>
            <input 
              type="range"
              min={0}
              max={1}
              value={volume}
              step={0.1}
              onChange={onVolume} 
            />
          </InputContainer>

          <InputContainer>
            <Text>Rate</Text>
            <input 
              type="range"
              min={0.25}
              max={5.0}
              value={rate}
              step={0.1}
              onChange={onRate} 
            />
          </InputContainer>

          <InputContainer>
            <Text>Mute</Text>
            <input type="checkbox" checked={muted} onChange={onMute} />
          </InputContainer>

          <InputContainer>
            <Text>Loop</Text>
            <input type="checkbox" checked={loop} onChange={onLoop} />
          </InputContainer>
        </InputsContainer>

        <StatesContainer>
          <StateTitle>State</StateTitle>

          <StatesLeftContainer>
            <StateContainer>
              <StateProperty>Loading: </StateProperty>
              <StateValue>{loading ? "TRUE" : "FALSE"}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Ready: </StateProperty>
              <StateValue>{ready ? "TRUE" : "FALSE"}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Playing: </StateProperty>
              <StateValue>{playing ? "TRUE" : "FALSE"}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Paused: </StateProperty>
              <StateValue>{paused ? "TRUE" : "FALSE"}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Stopped: </StateProperty>
              <StateValue>{stopped ? "TRUE" : "FALSE"}</StateValue>
            </StateContainer>
          </StatesLeftContainer>

          <StatesRightContainer>
            <StateContainer>
              <StateProperty>Duration: </StateProperty>
              <StateValue>{duration}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Volume: </StateProperty>
              <StateValue>{volume}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Seek: </StateProperty>
              <StateValue>{seek}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Rate: </StateProperty>
              <StateValue>{rate}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Error: </StateProperty>
              <StateValue>{error}</StateValue>
            </StateContainer>
          </StatesRightContainer>
        </StatesContainer>
      </InnerContainer>
    </Container>
  )
}

const App = () => {
  return (
    <RehawkProvider>
      <Player />
    </RehawkProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
