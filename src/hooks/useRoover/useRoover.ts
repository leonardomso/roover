import { useState, useEffect, useRef } from 'react';
import raf from 'raf';

import useAudio from '../useAudio/useAudio';

import { Args } from './useRoover.types';

const useRoover = ({
  src = '',
  preload = 'auto',
  autoplay = false,
  volume = 1.0,
  rate = 1.0,
  muted = false,
  loop = false,
}: Args) => {
  const { state, send, onCreateAudio } = useAudio();

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const playerRef = useRef<HTMLAudioElement | undefined>(undefined);

  const [seek, setSeek] = useState<number>(0);
  const playerSeekRef = useRef<number>(0);

  const idle: boolean = state.matches('idle');
  const loading: boolean = state.matches('loading');
  const ready: boolean = state.matches('ready');
  const playing: boolean = state.matches('ready.playing');
  const paused: boolean = state.matches('ready.paused');

  const playerVolume: number = state.context.volume;
  const playerRate: number = state.context.rate;
  const playerDuration: number = state.context.duration;
  const playerMuted: boolean = state.context.muted;
  const playerLoop: boolean = state.context.loop;
  const playerError: string | null = state.context.error;

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime;
      setSeek(seek as number);
      playerSeekRef.current = raf(animate);
    };

    if (audio && playing) {
      playerSeekRef.current = raf(animate);
    }

    return () => {
      if (playerSeekRef.current) {
        raf.cancel(playerSeekRef.current);
      }
    };
  }, [audio, playing]);

  /**
   * Should create new audio element and play it.
   * In case audio exists, it will play or pause based on the current state.
   * @returns void
   */
  const handleToggle = () => {
    if (!audio) {
      const audio: HTMLAudioElement = onCreateAudio({
        src,
        preload,
        autoplay,
        volume,
        rate,
        muted,
        loop,
      });
      setAudio(audio);
      playerRef.current = audio;
    } else {
      if (ready || paused) {
        audio.play();
        send('PLAY');
      }
      if (playing) {
        audio.pause();
        send('PAUSE');
      }
    }
  };

  const handlePlay = () => {
    if (!audio) return;
    send('PLAY');
    audio.play();
  };

  const handlePause = () => {
    if (!audio) return;
    send('PAUSE');
    audio.pause();
  };

  const handleMute = () => {
    if (!audio) return;
    send('MUTE');
    audio.muted = !muted;
  };

  const handleLoop = () => {
    if (!audio) return;
    send('LOOP');
    audio.loop = !loop;
  };

  const handleVolume = (value: number) => {
    if (!audio) return;
    send({ type: 'VOLUME', volume: value });
    audio.volume = value;
  };

  const handleRate = (value: string) => {
    if (!audio) return;
    const rate: number = parseFloat(value);
    audio.playbackRate = rate;
    send({ type: 'RATE', rate });
  };

  const handleSeek = (value: number) => {
    if (!audio) return;
    setSeek(value);
    audio.currentTime = value;
  };

  const handleForward = (value: number) => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek + value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  const handleBackward = (value: number) => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek - value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  return {
    idle,
    loading,
    ready,
    playing,
    paused,
    ended: audio?.ended,
    volume: playerVolume,
    rate: playerRate,
    duration: playerDuration,
    muted: playerMuted,
    loop: playerLoop,
    error: playerError,
    handleToggle,
    handlePlay,
    handlePause,
    handleVolume,
    handleRate,
    handleMute,
    handleLoop,
    handleSeek,
    handleForward,
    handleBackward,
  };
};

export default useRoover;
