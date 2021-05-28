import { useState, useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import raf from 'raf';

import RooverMachine from '../../machine/Machine';

import {
  UseAudio,
  CreateAudioArgs,
  MachineContext,
  MachineEvent,
} from '../../types';

const useAudio: UseAudio = () => {
  const [state, send] = useMachine<MachineContext, MachineEvent>(RooverMachine);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const [seek, setSeek] = useState<number>(0);
  const seekRef = useRef<number>(0);

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

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime;
      setSeek(seek as number);
      seekRef.current = raf(animate);
    };

    if (audio && playerPlaying) {
      seekRef.current = raf(animate);
    }

    return () => {
      if (seekRef.current) {
        raf.cancel(seekRef.current);
      }
    };
  }, [audio, playerPlaying]);

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

  const onLoad = async (args: CreateAudioArgs) => {
    if (playerRef.current) {
      await onLoadAnotherAudio(args);
    } else {
      const newAudio: HTMLAudioElement = await onCreateAudio(args);
      setAudio(newAudio);
      playerRef.current = newAudio;
    }
  };

  const onLoadAnotherAudio = (args: CreateAudioArgs) => {
    if (playerRef.current) {
      const currentSrc: string = playerRef.current.currentSrc;

      if (currentSrc === args.src) {
        return;
      }

      send('LOAD');
      audio?.setAttribute('src', args.src);
      audio?.load();
      audio?.play();
    } else {
      return;
    }
  };

  return {
    state,
    send,
    audio,
    seek,
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
  };
};

export default useAudio;
