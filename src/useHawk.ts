import { useState, useEffect, ChangeEvent } from 'react';
import { Howl } from 'howler';
import { useMachine } from '@xstate/react';

import HawkMachine from './HawkMachine';

import { HawkOptions } from './types';

const useHawk = ({
  src,
  format,
  html5 = true,
  autoplay = false,
  defaultVolume = 1.0,
  defaultRate = 1.0,
}: HawkOptions) => {
  const [current, send] = useMachine(HawkMachine, { devTools: true });
  const [howl, setHowl] = useState<Howl | null>(null);
  const [seek, setSeek] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [rate, setRate] = useState<number>(1.0);

  useEffect(() => {
    if (!src) return;

    const newHowl = new Howl({
      src,
      format,
      html5,
      preload: true,
      autoplay,
      volume: defaultVolume,
      rate: defaultRate,
      onload: () => {
        if (autoplay) {
          send({
            type: 'READY',
            duration: newHowl.duration() as number,
          });
          send('PLAY');
        } else {
          send({
            type: 'READY',
            duration: newHowl.duration() as number,
          });
        }
      },
      onloaderror: (_, message) => send({ type: 'ERROR', error: message }),
      onplay: () => send('PLAY'),
      onplayerror: (_, message) => send({ type: 'ERROR', error: message }),
      onpause: () => send('PAUSE'),
      onstop: () => {
        send('STOP');
        setSeek(0);
      },
      onend: () => {
        send('END');
        send('RETRY');
        setSeek(0);
      },
      onmute: () => send('MUTE'),
    });

    setHowl(newHowl);

    return () => {
      if (!howl) return;
      howl.off();
      howl.stop();
      howl.unload();
    };
  }, [src, format, html5, autoplay, defaultVolume, defaultRate]);

  // To render seek smoothly, need to figure this out.
  // It's throwing an error showing that howl.seek is an object.

  // const seekRef = useRef<number>();
  // const isPlaying = current.matches('ready.playing');
  // const isStopped = current.matches('ready.stopped');

  // useEffect(() => {
  //   const animate = () => {
  //     const seek = howl?.seek() as number;
  //     setSeek(seek);
  //     seekRef.current = raf(animate);
  //   };

  //   if (howl && isPlaying) {
  //     seekRef.current = raf(animate);
  //   }

  //   return () => {
  //     if (seekRef.current) {
  //       raf.cancel(seekRef.current);
  //     }
  //   };
  // }, [howl, isPlaying, isStopped]);

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

  const onLoop = () => {
    if (!howl?.mute()) {
      howl?.loop(true);
      send('LOOP');
    } else {
      howl?.loop(false);
      send('LOOP');
    }
  };

  const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const seek = parseFloat(e.target.value);
    setSeek(seek);
    howl?.seek(seek);
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
    duration: current.context.duration,
    seek,
    volume,
    rate,
    muted: current.context.muted,
    loop: current.context.loop,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
    onLoop,
    onSeek,
    onVolume,
    onRate,
  };
};

export default useHawk;
