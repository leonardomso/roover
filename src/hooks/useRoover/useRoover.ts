import { useState, useEffect, useRef, MutableRefObject } from 'react';
import raf from 'raf';

import useAudio from '../useAudio/useAudio';

import { Args } from './useRoover.types';

const useRoover = ({
  src = '',
  preload = 'auto',
  autoplay = false,
  volume = 1.0,
  rate = 1.0,
  mute = false,
  loop = false,
}: Args) => {
  const { state, send, onLoadAudio } = useAudio();

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const playerRef: MutableRefObject<HTMLAudioElement | undefined> = useRef<
    HTMLAudioElement | undefined
  >(undefined);

  const [seek, setSeek] = useState<number>(0);
  const seekRef: MutableRefObject<number> = useRef<number>(0);

  const initial: boolean = state.matches('initial');
  const loading: boolean = state.matches('loading');
  const ready: boolean = state.matches('ready');
  const idle: boolean = state.matches('ready.idle');
  const playing: boolean = state.matches('ready.playing');
  const paused: boolean = state.matches('ready.paused');
  const end: boolean = state.matches('end');

  const playerVolume: number = state.context.volume;
  const playerRate: number = state.context.rate;
  const playerDuration: number = state.context.duration;
  const playerMuted: boolean = state.context.mute;
  const playerLoop: boolean = state.context.loop;
  const playerError: string | null = state.context.error;

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime;
      setSeek(seek as number);
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
  }, [audio, playing]);

  /**
   * Should create new audio element and play it.
   * In case audio exists, it will play or pause based on the current state.
   * @returns void
   */
  const onToggle = (): void => {
    if (!audio) {
      const newAudio = onLoadAudio(audio, {
        src,
        preload,
        autoplay,
        volume,
        rate,
        mute,
        loop,
      });
      setAudio(newAudio);
      playerRef.current = newAudio;
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

  /**
   * Play the audio.
   * @returns void
   */
  const onPlay = (): void => {
    if (!audio) return;
    send('PLAY');
    audio.play();
  };

  /**
   * Pause the audio.
   * @returns void
   */
  const onPause = (): void => {
    if (!audio) return;
    send('PAUSE');
    audio.pause();
  };

  /**
   * Set 'mute' to true or false depending of the current value.
   * @returns void
   */
  const onMute = (): void => {
    if (!audio) return;
    send('MUTE');
    audio.muted = mute;
  };

  /**
   * Set 'loop' to true or false depending of the current value.
   * @returns void
   */
  const onLoop = (): void => {
    if (!audio) return;
    send('LOOP');
    audio.loop = loop;
  };

  /**
   * Changes the volume of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const onVolume = (value: number): void => {
    if (!audio) return;
    send({ type: 'VOLUME', volume: value });
    audio.volume = value;
  };

  /**
   * Changes the playback rate of the audio.
   * @param {string} value - The value of the volume.
   * @returns void
   */
  const onRate = (value: string): void => {
    if (!audio) return;
    const rate: number = parseFloat(value);
    audio.playbackRate = rate;
    send({ type: 'RATE', rate });
  };

  /**
   * Changes the seek of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const onSeek = (value: number): void => {
    if (!audio) return;
    setSeek(value);
    audio.currentTime = value;
  };

  /**
   * Forward the seek value of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const onForward = (value: number): void => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek + value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  /**
   * Backward the seek value of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const onBackward = (value: number): void => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek - value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  return {
    initial,
    loading,
    ready,
    idle,
    playing,
    paused,
    end,
    seek,
    volume: playerVolume,
    rate: playerRate,
    duration: playerDuration,
    mute: playerMuted,
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
