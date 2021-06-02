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
  onInitial = () => {},
  onLoading = () => {},
  onReady = () => {},
  onIdle = () => {},
  onPlaying = () => {},
  onPause = () => {},
  onVolume = () => {},
  onRate = () => {},
  onMute = () => {},
  onLoop = () => {},
  onEnd = () => {},
  onError = () => {},
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

  const playerContextVolume: number = state.context.volume;
  const playerContextRate: number = state.context.rate;
  const playerContextDuration: number = state.context.duration;
  const playerContextMute: boolean = state.context.mute;
  const playerContextLoop: boolean = state.context.loop;
  const playerContextError: string | null = state.context.error;

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

  useEffect(() => {
    if (initial === true) onInitial();
    if (loading === true) onLoading();
    if (ready === true) onReady();
    if (idle === true) onIdle();
    if (playing === true) onPlaying();
    if (paused === true) onPause();
  }, [
    initial,
    loading,
    ready,
    idle,
    playing,
    paused,
    onIdle,
    onInitial,
    onLoading,
    onPause,
    onPlaying,
    onReady,
  ]);

  /**
   * Should create new audio element and play it.
   * In case audio exists, it will play or pause based on the current state.
   * @returns void
   */
  const handleToggle = (): void => {
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
  const handlePlay = (): void => {
    if (!audio) return;
    send('PLAY');
    audio.play();
  };

  /**
   * Pause the audio.
   * @returns void
   */
  const handlePause = (): void => {
    if (!audio) return;
    send('PAUSE');
    audio.pause();
  };

  /**
   * Set 'mute' to true or false depending of the current value.
   * @returns void
   */
  const handleMute = (): void => {
    if (!audio) return;
    send('MUTE');
    audio.muted = !playerContextMute;
  };

  /**
   * Set 'loop' to true or false depending of the current value.
   * @returns void
   */
  const handleLoop = (): void => {
    if (!audio) return;
    send('LOOP');
    audio.loop = !playerContextLoop;
  };

  /**
   * Changes the volume of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const handleVolume = (value: number): void => {
    if (!audio) return;
    send({ type: 'VOLUME', volume: value });
    audio.volume = value;
  };

  /**
   * Changes the playback rate of the audio.
   * @param {string} value - The value of the volume.
   * @returns void
   */
  const handleRate = (value: string): void => {
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
  const handleSeek = (value: number): void => {
    if (!audio) return;
    setSeek(value);
    audio.currentTime = value;
  };

  /**
   * Forward the seek value of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const handleForward = (value: number): void => {
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
  const handleBackward = (value: number): void => {
    if (!audio || audio.ended) return;
    const newSeek: number = seek - value;
    setSeek(newSeek);
    audio.currentTime = newSeek;
  };

  useEffect(() => {
    onVolume();
  }, [playerContextVolume, onVolume]);

  useEffect(() => {
    onRate();
  }, [playerContextRate, onRate]);

  useEffect(() => {
    onMute();
  }, [playerContextMute, onMute]);

  useEffect(() => {
    onLoop();
  }, [playerContextLoop, onLoop]);

  useEffect(() => {
    onEnd();
  }, [end, onEnd]);

  useEffect(() => {
    onError();
  }, [playerContextError, onError]);

  return {
    initial,
    loading,
    ready,
    idle,
    playing,
    paused,
    end,
    seek,
    volume: playerContextVolume,
    rate: playerContextRate,
    duration: playerContextDuration,
    mute: playerContextMute,
    loop: playerContextLoop,
    error: playerContextError,
    onToggle: handleToggle,
    onPlay: handlePlay,
    onPause: handlePause,
    onVolume: handleVolume,
    onRate: handleRate,
    onMute: handleMute,
    onLoop: handleLoop,
    onSeek: handleSeek,
    onForward: handleForward,
    onBackward: handleBackward,
  };
};

export default useRoover;
