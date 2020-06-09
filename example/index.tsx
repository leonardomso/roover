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
            <input type="checkbox" checked={muted} onChange={onMute} />
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
