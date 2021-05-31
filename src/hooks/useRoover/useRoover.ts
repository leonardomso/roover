import { useState, useEffect, useRef } from 'react';
import raf from 'raf';

import useAudio from '../useAudio/useAudio';

import { Args } from './useRoover.types';

const useRoover = ({
  src = '',
  preload = 'auto',
  autoplay = true,
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
  const onToggle = () => {
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

      if (autoplay) {
        audio.play();
        send('PLAY');
      }
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

  const onPlay = async () => {};

  const onPause = () => {
    if (!audio) return;
    send('PAUSE');
    audio.pause();
  };

  const onMute = () => {
    if (!audio) return;
    send('MUTE');
    audio.muted = !muted;
  };

  const onLoop = () => {
    if (!audio) return;
    send('LOOP');
    audio.loop = !loop;
  };

  const onVolume = (value: number) => {
    if (!audio) return;
    send({ type: 'VOLUME', volume: value });
    audio.volume = value;
  };

  const onRate = (value: string) => {
    if (!audio) return;
    const rate: number = parseFloat(value);
    audio.playbackRate = rate;
    send({ type: 'RATE', rate });
  };

  const onSeek = (value: number) => {
    if (!audio) return;
    setSeek(value);
    audio.currentTime = value;
  };

  const onForward = (value: number) => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek + value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  const onBackward = (value: number) => {
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
    onToggle,
    onPlay,
    onPause,
    onVolume,
    onRate,
    onMute,
    onLoop,
    onSeek,
    onForward,
    onBackward,
  };
};

export default useRoover;
