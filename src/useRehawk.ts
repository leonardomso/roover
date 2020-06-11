import { useContext, useState, useEffect, useRef, ChangeEvent } from 'react';
import raf from 'raf';

import RehawkContext from './RehawkContext';

import { RehawkOptions } from './types';

const useRehawk = ({
  src,
  autoplay = false,
  volume = 0.5
}: RehawkOptions) => {
  const context = useContext(RehawkContext);

  if (context === undefined) {
    throw new Error('useRehawk can only be used inside RehawkProvider');
  }

  const {
    audio,
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
  } = context;

  const [hawkVolume, setRehawkVolume] = useState<number>(volume);
  const [hawkRate, setRehawkRate] = useState<number>(1.0);
  const [hawkSeek, setHawkSeek] = useState<number>(0);

  const seekRef = useRef<number>();

  useEffect(() => {
    if (!src) return;
    load({ src, autoplay, volume });
  }, [src, autoplay, volume, load]);

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime;
      setHawkSeek(seek as number);
      seekRef.current = raf(animate);
    };

    if (audio && playing) {
      seekRef.current = raf(animate);
    }

    return () => {
      if (seekRef.current) {
        raf.cancel(seekRef.current);
      }
    };
  }, [audio, playing, stopped]);

  const onToggle = () => {
    if (!audio) return;
    if (ready) audio.play();
    if (playing) audio.pause();
  }

  const onPlay = () => {
    if (!audio) return;
    audio.play();
  };

  const onPause = () => {
    if (!audio) return;
    audio.pause();
  };

  const onStop = () => {
    if (!audio) return;
    audio.pause();
    send('STOP');
    setHawkSeek(0);
    audio.currentTime = 0;
  }

  const onMute = () => {
    if (!audio) return;
    audio.muted = !muted;
    send('MUTE');
  };

  const onLoop = () => {
    if (!audio) return;
    audio.loop = !loop;
    send('LOOP');
  };

  const onVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const volume = parseFloat(e.target.value);
    setRehawkVolume(volume);
    audio.volume = volume;
  };

  const onRate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const rate = parseFloat(e.target.value);
    setRehawkRate(rate);
    audio.playbackRate = rate;
  };

  const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const seek = parseFloat(e.target.value);
    setHawkSeek(seek);
    audio.currentTime = seek;
  };

  return {
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    duration,
    seek: hawkSeek,
    volume: hawkVolume,
    muted,
    rate: hawkRate,
    loop,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
    onLoop,
    onVolume,
    onRate,
    onSeek
  };
};

export default useRehawk;
