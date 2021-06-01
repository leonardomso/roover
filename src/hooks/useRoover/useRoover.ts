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
  const { state, send, onLoadAudio } = useAudio();

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const playerRef = useRef<HTMLAudioElement | undefined>(undefined);

  const [seek, setSeek] = useState<number>(0);
  const playerSeekRef = useRef<number>(0);

  const playing: boolean = state.matches('playing');

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime;
      setSeek(seek as number);
      playerSeekRef.current = raf(animate);
    };

    if (audio && state.matches('playing')) {
      playerSeekRef.current = raf(animate);
    }

    return () => {
      if (playerSeekRef.current) {
        raf.cancel(playerSeekRef.current);
      }
    };
  }, [audio, state, playing]);

  /**
   * Should create new audio element and play it.
   * In case audio exists, it will play or pause based on the current state.
   * @returns void
   */
  const onToggle = () => {
    if (!audio) {
      const newAudio = onLoadAudio(audio, {
        src,
        preload,
        autoplay,
        volume,
        rate,
        muted,
        loop,
      });
      setAudio(newAudio);
      playerRef.current = newAudio;
    } else {
      if (state.matches('ready') || state.matches('paused')) {
        audio.play();
        send('PLAY');
      }
      if (state.matches('playing')) {
        audio.pause();
        send('PAUSE');
      }
    }
  };

  /**
   * Play the audio.
   * In case there's no audio, it does nothing.
   * @returns void
   */
  const onPlay = () => {
    if (!audio) return;
    send('PLAY');
    audio.play();
  };

  /**
   * Pause the audio.
   * In case there's no audio, it does nothing.
   * @returns void
   */
  const onPause = () => {
    if (!audio) return;
    send('PAUSE');
    audio.pause();
  };

  /**
   * Set 'muted' to true or false depending of the current value.
   * In case there's no audio, it does nothing.
   * @returns void
   */
  const onMute = () => {
    if (!audio) return;
    send('MUTE');
    audio.muted = !muted;
  };

  /**
   * Set 'loop' to true or false depending of the current value.
   * In case there's no audio, it does nothing.
   * @returns void
   */
  const onLoop = () => {
    if (!audio) return;
    send('LOOP');
    audio.loop = !loop;
  };

  /**
   * Changes the volume of the audio.
   * @param {number} value - The value of the volume.
   * @returns HTMLAudioElement
   */
  const onVolume = (value: number) => {
    if (!audio) return;
    send({ type: 'VOLUME', volume: value });
    audio.volume = value;
  };

  /**
   * Changes the playback rate of the audio.
   * @param {string} value - The value of the volume.
   * @returns HTMLAudioElement
   */
  const onRate = (value: string) => {
    if (!audio) return;
    const rate: number = parseFloat(value);
    audio.playbackRate = rate;
    send({ type: 'RATE', rate });
  };

  /**
   * Changes the seek of the audio.
   * @param {number} value - The value of the volume.
   * @returns HTMLAudioElement
   */
  const onSeek = (value: number) => {
    if (!audio) return;
    setSeek(value);
    audio.currentTime = value;
  };

  /**
   * Forward the seek value of the audio.
   * @param {number} value - The value of the volume.
   * @returns HTMLAudioElement
   */
  const onForward = (value: number) => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek + value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  /**
   * Backward the seek value of the audio.
   * @param {number} value - The value of the volume.
   * @returns HTMLAudioElement
   */
  const onBackward = (value: number) => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek - value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  return {
    idle: state.matches('idle'),
    loading: state.matches('loading'),
    ready: state.matches('ready'),
    playing: state.matches('playing'),
    paused: state.matches('paused'),
    ended: state.matches('end'),
    seek,
    volume: state.context.volume,
    rate: state.context.rate,
    duration: state.context.duration,
    muted: state.context.muted,
    loop: state.context.loop,
    error: state.context.error,
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
