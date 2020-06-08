import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useHawk } from "../src"

import { Button, Input } from "./styles";

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
    muted,
    seek,
    duration,
    position,
    onToggle, 
    onPlay, 
    onPause,
    onStop,
    onMute
  } = useHawk({
    src,
    preload: true,
    autoplay: false,
    volume: 1
  });

  console.log('Position: ', position)

  return (
    <div>
      <Input
        type="text"
        name="url"
        placeholder="Enter your URL"
        value=""
        onChange={() => {}}
      />
      <h3>Ready: {ready ? "true" : "false"}</h3>
      <h3>Loading: {loading ? "true" : "false"}</h3>
      <h3>Playing: {playing ? "true" : "false"}</h3>
      <h3>Paused: {paused ? "true" : "false"}</h3>
      <h3>Stopped: {stopped ? "true" : "false"}</h3>
      <h3>Muted: {muted ? "true" : "false"}</h3>
      <h3>Error: {error}</h3>
      <label>Mute:
        <input type="checkbox" checked={muted} onChange={onMute} />
      </label>
      <Button type="button" onClick={onPlay} disabled={!ready}>Play</Button>
      <Button type="button" onClick={onPause} disabled={!ready}>Pause</Button>
      <Button type="button" onClick={onStop} disabled={!ready}>Stop</Button>
      <Button type="button" onClick={onToggle} disabled={!ready}>Toggle</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
