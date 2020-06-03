import { useMachine } from '@xstate/react';

import HawkMachine from '../machines/HawkMachine';

const useHawk = () => {
  const [current, send] = useMachine(HawkMachine);

  const onLoad = () => {
    send('LOAD');
  };

  const onToggle = () => {
    if (current.matches('idle') || current.matches('paused')) {
      send('PLAY');
    } else {
      send('PAUSE');
    }
  };

  const onPlay = () => {
    send('PLAY');
  };

  const onPause = () => {
    send('PAUSE');
  };

  const onStop = () => {
    send('STOP');
  };

  const onEnd = () => {
    send('END');
  };

  return {
    ready: current.matches('ready'),
    loading: current.matches('loading'),
    playing: current.matches('ready.playing'),
    paused: current.matches('ready.paused'),
    stopped: current.matches('ready.stopped'),
    onLoad,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onEnd,
  };
};

export default useHawk;
