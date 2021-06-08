import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { useSelector } from '@xstate/react';
import raf from 'raf';

import useAudio from '../useAudio/useAudio';

import { Args, ReturnArgs } from './useRoover.types';

/**
 * The useRoover hook.
 * @param {string} src - The src of the audio to be loaded.
 * @param {string} preload - The preload property for the audio.
 * @param {boolean} autoplay - The autoplay property for the audio.
 * @param {number} volume - The volume property for the audio.
 * @param {number} rate - The rate property for the audio.
 * @param {boolean} mute - The mute property for the audio.
 * @param {boolean} loop - The loop property for the audio.
 *
 * @return {boolean} initial - Whether the audio is initial.
 * @return {boolean} loading - Whether the audio is loading.
 * @return {boolean} ready - Whether the audio is ready.
 * @return {boolean} idle - Whether the audio is idle.
 * @return {boolean} playing - Whether the audio is playing.
 * @return {boolean} paused - Whether the audio is paused.
 * @return {boolean} end - Whether the audio has ended.
 * @return {number} seek - The seek value of the audio.
 * @return {number} volume - The volume value of the audio.
 * @return {number} rate - The rate value of the audio.
 * @return {number} duration - The duration value of the audio.
 * @return {boolean} mute - The mute value of the audio.
 * @return {boolean} loop - The loop value of the audio.
 * @return {function} onToggle - Function to toggle the audio.
 * @return {function} onPlay - Function to play the audio.
 * @return {function} onPause - Function to pause the audio.
 * @return {function} onVolume - Function to change the volume of the audio.
 * @return {function} onRate - Function to change the rate of the audio.
 * @return {function} onMute - Function to mute/unmute the audio.
 * @return {function} onLoop - Function to loop/unloop the audio.
 * @return {function} onSeek - Function to change the seek of the audio.
 * @return {function} onForward - Function to forward the audio in a specific amount of seconds.
 * @return {function} onBackward - Function to backward the audio in a specific amount of seconds.
 */

const useRoover = ({
  src = '',
  preload = 'auto',
  autoplay = false,
  volume = 1.0,
  rate = 1.0,
  mute = false,
  loop = false,
}: Args): ReturnArgs => {
  const { service, onLoadAudio } = useAudio();

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const playerRef: MutableRefObject<HTMLAudioElement | undefined> = useRef<
    HTMLAudioElement | undefined
  >(undefined);

  const [seek, setSeek] = useState<number>(0);
  const seekRef: MutableRefObject<number> = useRef<number>(0);

  const initial = useSelector(service, state => state.matches('initial'));
  const loading: boolean = useSelector(service, state =>
    state.matches('loading')
  );
  const ready: boolean = useSelector(service, state => state.matches('ready'));
  const idle: boolean = useSelector(service, state =>
    state.matches('ready.idle')
  );
  const playing: boolean = useSelector(service, state =>
    state.matches('ready.playing')
  );
  const paused: boolean = useSelector(service, state =>
    state.matches('ready.paused')
  );
  const end: boolean = useSelector(service, state => state.matches('end'));

  const playerContextVolume: number = useSelector(
    service,
    state => state.context.volume
  );
  const playerContextRate: number = useSelector(
    service,
    state => state.context.rate
  );
  const playerContextDuration: number = useSelector(
    service,
    state => state.context.duration
  );
  const playerContextMute: boolean = useSelector(
    service,
    state => state.context.mute
  );
  const playerContextLoop: boolean = useSelector(
    service,
    state => state.context.loop
  );
  const playerContextError: string | null = useSelector(
    service,
    state => state.context.error
  );

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
        service.send('PLAY');
      }
      if (playing) {
        audio.pause();
        service.send('PAUSE');
      }
    }
  };

  /**
   * Play the audio.
   * @returns void
   */
  const onPlay = (): void => {
    if (!audio) return;
    service.send('PLAY');
    audio.play();
  };

  /**
   * Pause the audio.
   * @returns void
   */
  const onPause = (): void => {
    if (!audio) return;
    service.send('PAUSE');
    audio.pause();
  };

  /**
   * Set 'mute' to true or false depending of the current value.
   * @returns void
   */
  const onMute = (): void => {
    if (!audio) return;
    service.send('MUTE');
    audio.muted = !playerContextMute;
  };

  /**
   * Set 'loop' to true or false depending of the current value.
   * @returns void
   */
  const onLoop = (): void => {
    if (!audio) return;
    service.send('LOOP');
    audio.loop = !playerContextLoop;
  };

  /**
   * Changes the volume of the audio.
   * @param {number} value - The value of the volume.
   * @returns void
   */
  const onVolume = (value: number): void => {
    if (!audio) return;
    service.send({ type: 'VOLUME', volume: value });
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
    service.send({ type: 'RATE', rate });
    audio.playbackRate = rate;
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
    volume: playerContextVolume,
    rate: playerContextRate,
    duration: playerContextDuration,
    mute: playerContextMute,
    loop: playerContextLoop,
    error: playerContextError,
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
