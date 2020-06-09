import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useHawk } from "../src"

import 'rc-slider/assets/index.css';

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

const App = () => {
  const {
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    duration,
    position,
    volume,
    rate,
    muted,
    loop,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
    onLoop,
    onPosition,
    onVolume,
    onRate
  } = useHawk({
    src,
    autoplay: false
  });

  return (
    <Container>
      <InnerContainer>
        <RehawkTitle>Rehawk</RehawkTitle>

        <ButtonsContainer>
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
              value={position}
              step={0.1}
              onChange={onPosition} 
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
              min={0}
              max={4.0}
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
              <StateValue>{position}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty>Rate: </StateProperty>
              <StateValue>{rate}</StateValue>
            </StateContainer>

            <StateContainer>
              <StateProperty></StateProperty>
              <StateValue></StateValue>
            </StateContainer>
          </StatesRightContainer>
        </StatesContainer>
      </InnerContainer>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
