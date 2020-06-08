import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  ChangeEvent,
} from 'react';
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
  defaultVolume = 1.0,
  defaultRate = 1.0,
}: HawkOptions) => {
  const [current, send] = useMachine(HawkMachine, {
    devTools: true,
  });
  const [howl, setHowl] = useState<Howl | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [rate, setRate] = useState<number>(1.0);

  const positionRef = useRef<number>();

  const isPlaying = current.matches('ready.playing');
  const isStopped = current.matches('ready.stopped');

  useEffect(() => {
    if (!src) return;

    const newHowl = new Howl({
      src,
      format,
      html5,
      preload: true,
      autoplay,
      volume: defaultVolume,
      loop,
      rate: defaultRate,
      onloaderror: (_, message) => send({ type: 'ERROR', error: message }),
      onplay: () => send('PLAY'),
      onplayerror: (_, message) => send({ type: 'ERROR', error: message }),
      onpause: () => send('PAUSE'),
      onstop: () => send('STOP'),
      onend: () => send('END'),
      onmute: () => send('MUTE'),
    });

    newHowl.once('load', () => {
      if (autoplay) {
        send({
          type: 'READY',
          duration: newHowl.duration() as number,
          position: newHowl.seek() as number,
        });
        send('PLAY');
      } else {
        send({
          type: 'READY',
          duration: newHowl.duration() as number,
          position: newHowl.seek() as number,
        });
      }
    });

    setHowl(newHowl);

    return () => {
      if (!howl) return;
      howl.off();
      howl.stop();
      howl.unload();
    };
  }, [src, format, html5, autoplay, loop, defaultVolume, defaultRate]);

  useLayoutEffect(() => {
    const animate = () => {
      setPosition(howl?.seek() as number);
      positionRef.current = raf(animate);
    };

    if (howl && isPlaying) {
      positionRef.current = raf(animate);
    }

    return () => {
      if (positionRef.current) {
        raf.cancel(positionRef.current);
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

  const onPosition = (e: ChangeEvent<any>) => {
    const position = parseFloat(e.target.value);
    setPosition(position)
    howl?.seek(position);
  };

  const onVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
    howl?.volume(volume);
  };

  const onRate = (e: ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value);
    setRate(rate);
    howl?.rate(rate);
  };

  return {
    loading: current.matches('loading'),
    ready: current.matches('ready'),
    error: current.context.error,
    playing: current.matches('ready.playing'),
    paused: current.matches('ready.paused'),
    stopped: current.matches('ready.stopped'),
    volume,
    rate,
    muted: current.context.muted,
    duration: current.context.duration,
    position,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
    onPosition,
    onVolume,
    onRate,
  };
};

export default useHawk;
