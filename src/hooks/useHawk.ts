import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useMachine } from '@xstate/react';
import raf from 'raf';

import HawkMachine from '../machines/HawkMachine';

import { HawkOptions } from '../types';

const useHawk = ({
  src,
  format,
  html5 = true,
  autoplay = false,
  loop = false,
  rate = 1.0,
}: HawkOptions) => {
  const [current, send] = useMachine(HawkMachine, {
    devTools: true
  });
  const [howl, setHowl] = useState<Howl | null>(null);
  const [, setPosition] = useState<number>(0);

  const animationRef = useRef<number>();

  const isPlaying = current.matches('playing');
  const isStopped = current.matches('stopped');

  useEffect(() => {
    if (!src) return;

    const newHowl = new Howl({
      src,
      format,
      html5,
      preload: true,
      autoplay,
      volume: 1,
      loop,
      rate,
      onloaderror: (_, message) => send({ type: 'ERROR', error: message }),
      onplay: () => send('PLAY'),
      onplayerror: (_, message) => send({ type: 'ERROR', error: message }),
      onpause: () => send('PAUSE'),
      onstop: () => send('STOP'),
      onend: () => send('END'),
      onmute: () => send('MUTE'),
    });

    setHowl(newHowl);

    newHowl.once('load', () => {
      if (autoplay) {
        send({
          type: 'READY',
          howl: newHowl as Howl,
          duration: newHowl.duration(),
          position: newHowl.seek() as number,
        });
        send('PLAY');
      } else {
        send({
          type: 'READY',
          howl: newHowl as Howl,
          duration: newHowl.duration(),
          position: newHowl.seek() as number,
        });
      }
    });

    return () => {
      if (!howl) return;
      howl.off();
      howl.stop();
      howl.unload();
    };
  }, [src, format, html5, autoplay, loop, rate]);

  // Updates position on a 60fps loop for high refresh rate setting
  useLayoutEffect(() => {
    const animate = () => {
      setPosition(howl?.seek() as number);
      animationRef.current = raf(animate);
    };

    if (howl && isPlaying) {
      animationRef.current = raf(animate);
    }

    return () => {
      if (animationRef.current) {
        raf.cancel(animationRef.current);
      }
    };
  }, [howl, isPlaying, isStopped]);

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
