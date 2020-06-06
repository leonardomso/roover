import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { useMachine } from '@xstate/react';

import HawkMachine from '../machines/HawkMachine';

import { HawkOptions } from '../types';

const useHawk = ({
  src,
  format,
  html5 = false,
  preload = true,
  autoplay = false,
  volume = 100,
  mute = false,
  loop = false,
  rate = 1.0,
}: HawkOptions) => {
  const [current, send] = useMachine(HawkMachine, { devTools: true });
  const [howl, setHowl] = useState<Howl | null>(null);

  useEffect(() => {
    if (!src) return;

    const newHowl = new Howl({
      src,
      format,
      html5,
      preload,
      autoplay,
      volume,
      mute,
      loop,
      rate,
      onload: () => send('READY'),
      onloaderror: (_, message) => send({ type: 'ERROR', error: message }),
      onplay: () => send('PLAY'),
      onplayerror: (_, message) => send({ type: 'ERROR', error: message }),
      onpause: () => send('PAUSE'),
      onstop: () => send('STOP'),
      onend: () => send('END'),
      onmute: () => send('MUTE'),
    });

    setHowl(newHowl);

    return () => {
      if (!howl) return;
      howl.off();
      howl.stop();
      howl.unload();
    };
  }, [src, format, html5, preload, autoplay, volume]);

  const onToggle = () => {
    if (howl?.playing()) {
      howl.pause();
    } else {
      howl?.play();
    }
  };

  const onPlay = () => {
    if (howl?.playing()) return;
    howl?.play();
  };

  const onPause = () => {
    howl?.pause();
  };

  const onStop = () => {
    howl?.stop();
  };

  const onMute = () => {
    if (!howl?.mute()) {
      howl?.mute(true);
    } else {
      howl?.mute(false);
    }
  };

  return {
    loading: current.matches('loading'),
    ready: current.matches('ready'),
    error: current.context.error,
    playing: current.matches('ready.playing'),
    paused: current.matches('ready.paused'),
    stopped: current.matches('ready.stopped'),
    muted: current.context.muted,
    seek: current.context.seek,
    duration: current.context.duration,
    position: current.context.position,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
  };
};

export default useHawk;
