import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useHawk } from "../src"

import { Button } from "./styles"

const App = () => {
  const {
    ready,
    loading,
    playing,
    paused,
    stopped,
    onLoad,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onEnd,
  } = useHawk();

  return (
    <div>
      <Button onClick={onLoad}>Load</Button>
      <h3>Ready: {ready ? "true" : "false"}</h3>
      <h3>Loading: {loading ? "true" : "false"}</h3>
      <h3>Stopped: {stopped ? "true" : "false"}</h3>
      <Button onClick={onPlay}>Play</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button onClick={onStop}>Stop</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
