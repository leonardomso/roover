import { useMachine } from '@xstate/react';

import RooverMachine from '../../machine/Machine';

import {
  UseAudio,
  CreateAudioArgs,
  MachineContext,
  MachineEvent,
} from '../../types';

const useAudio: UseAudio = () => {
  const [state, send] = useMachine<MachineContext, MachineEvent>(RooverMachine);

  const playerIdle: boolean = state.matches('idle');
  const playerLoading: boolean = state.matches('loading');
  const playerReady: boolean = state.matches('ready');
  const playerReadyIdle: boolean = state.matches('ready.idle');
  const playerPlaying: boolean = state.matches('ready.playing');
  const playerPaused: boolean = state.matches('ready.paused');

  const playerVolume: number = state.context.volume;
  const playerRate: number = state.context.rate;
  const playerDuration: number = state.context.duration;
  const playerMuted: boolean = state.context.muted;
  const playerLoop: boolean = state.context.loop;
  const playerError: string | null = state.context.error;

  const onCreateAudio = async ({
    src,
    preload,
    autoplay,
    volume,
    rate,
    muted,
    loop,
  }: CreateAudioArgs): Promise<HTMLAudioElement> => {
    const audioElement: HTMLAudioElement = await new Audio(src);

    audioElement.autoplay = autoplay ? autoplay : true;
    audioElement.volume = volume ? volume : 1.0;
    audioElement.muted = muted ? muted : false;
    audioElement.loop = loop ? loop : false;
    audioElement.playbackRate = rate ? rate : 1.0;
    audioElement.preload = preload ? preload : 'auto';

    audioElement.addEventListener('error', () => send('ERROR'));
    audioElement.addEventListener('loadstart', () => {
      send('READY', {
        volume: audioElement.volume,
        rate: audioElement.playbackRate,
        duration: audioElement.duration,
        muted: audioElement.muted,
        loop: audioElement.loop,
      });
    });
    audioElement.addEventListener('loadeddata', () => {
      send('READY', {});
    });
    audioElement.addEventListener('ended', () => {
      send('END');
    });

    return audioElement;
  };

  const onLoad = async (
    audio: HTMLAudioElement | undefined,
    args: CreateAudioArgs
  ): Promise<HTMLAudioElement | undefined> => {
    if (audio) {
      const currentSrc: string = audio.currentSrc;

      if (currentSrc === args.src) {
        return;
      }
      return onLoad(undefined, args);
    } else {
      const newAudio: HTMLAudioElement = await onCreateAudio(args);
      return newAudio;
    }
  };

  const onDestroy = (audio: HTMLAudioElement | undefined): void => {
    if (!audio) {
      return;
    } else {
      audio.currentTime = 0;
      audio.removeAttribute('src');
      audio = undefined;
    }
  };

  return {
    state,
    send,
    idle: playerIdle,
    loading: playerLoading,
    ready: playerReady,
    readyIdle: playerReadyIdle,
    playing: playerPlaying,
    paused: playerPaused,
    volume: playerVolume,
    rate: playerRate,
    duration: playerDuration,
    muted: playerMuted,
    loop: playerLoop,
    error: playerError,
    onLoad,
    onDestroy,
  };
};

export default useAudio;
