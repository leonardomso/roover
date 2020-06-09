import { useState, useEffect, ChangeEvent } from 'react';

import useHawkContext from './useHawkContext';

import { HawkOptions } from './types';

const useHawk = ({
  src,
  format,
  html5 = true,
  autoplay = false,
  defaultVolume = 1.0,
  defaultRate = 1.0,
}: HawkOptions) => {
  const [volume, setVolume] = useState<number>(0.5);
  const [rate, setRate] = useState<number>(1.0);

  const {
    howl,
    load,
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    duration,
    muted,
    loop,
    send,
    seek,
    setSeek,
  } = useHawkContext();

  useEffect(() => {
    if (!src) return;
    load({ src, format, html5, autoplay, defaultVolume, defaultRate });
  }, [src, format, html5, autoplay, defaultVolume, defaultRate, load]);

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
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    duration,
    seek,
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
    onSeek,
    onVolume,
    onRate,
  };
};

export default useHawk;
