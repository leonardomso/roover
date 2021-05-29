import { useMachine } from '@xstate/react';

import RooverMachine from '../../machine/Machine';

import {
  UseAudio,
  CreateAudioElement,
  MachineContext,
  MachineEvent,
} from '../../types';

const useAudio: UseAudio = () => {
  const [state, send] = useMachine<MachineContext, MachineEvent>(RooverMachine);

  /**
   * Create a new Audio element and returns it.
   * @param src - The src of the audio to be loaded.
   * @param preload - The preload property for the audio.
   * @param autoplay - The autoplay property for the audio.
   * @param volume - The volume property for the audio.
   * @param rate - The rate property for the audio.
   * @param muted - The muted property for the audio.
   * @param loop - The loop property for the audio.
   * @returns HTMLAudioElement
   */
  const onCreateAudio = async ({
    src,
    preload,
    autoplay,
    volume,
    rate,
    muted,
    loop,
  }: CreateAudioElement): Promise<HTMLAudioElement> => {
    const audioElement: HTMLAudioElement = await new Audio(src);

    audioElement.autoplay = autoplay === false ? autoplay : true;
    audioElement.volume = volume ? volume : 1.0;
    audioElement.muted = muted ? muted : false;
    audioElement.loop = loop ? loop : false;
    audioElement.playbackRate = rate ? rate : 1.0;
    audioElement.preload = preload ? preload : 'auto';

    // When the audio has some problem, it will trigger a 'ERROR' event.
    audioElement.addEventListener('error', () => send('ERROR'));
    // When the audio has started to load, it will trigger a 'LOAD' event.
    audioElement.addEventListener('loadstart', () => {
      send('LOAD');
    });
    // When the audio has loaded successfully, it will triger a 'READY' event and change values in the context.
    audioElement.addEventListener('loadeddata', () => {
      send('READY', {
        volume: audioElement.volume,
        rate: audioElement.playbackRate,
        duration: audioElement.duration,
        muted: audioElement.muted,
        loop: audioElement.loop,
      });
    });
    // When the volume has changed, will trigger a 'VOLUME' event and set the new value in the context.
    audioElement.addEventListener('volumechange', () => {
      send('VOLUME', {
        volume: audioElement.volume,
      });
    });
    // When the audio plays, it will trigger a 'PLAY' event.
    audioElement.addEventListener('play', () => {
      send('PLAY');
    });
    // When the audio has paused, it will trigger a 'PAUSE' event.
    audioElement.addEventListener('pause', () => {
      send('PAUSE');
    });
    // When the rate has changed, it will trigger a 'RATE' event and set the new value in the context.
    audioElement.addEventListener('ratechange', () => {
      send('READY', {
        rate: audioElement.playbackRate,
      });
    });
    // When the audio has ended, it will trigger a 'END' event.
    audioElement.addEventListener('ended', () => {
      send('END');
    });

    return audioElement;
  };

  const onLoadAudio = async (
    audio: HTMLAudioElement | undefined,
    args: CreateAudioElement
  ): Promise<HTMLAudioElement | undefined> => {
    if (audio !== undefined) {
      const currentSrc: string = audio.currentSrc;

      if (currentSrc === args.src) {
        return undefined;
      }

      return undefined;
    } else {
      const newAudio: HTMLAudioElement = await onCreateAudio(args);
      return newAudio;
    }
  };

  const onDestroyAudio = (audio: HTMLAudioElement | undefined): void => {
    if (!audio) {
      return undefined;
    } else {
      audio.currentTime = 0;
      audio.removeAttribute('src');
      audio = undefined;
    }
  };

  return {
    state,
    send,
    onCreateAudio,
    onLoadAudio,
    onDestroyAudio,
  };
};

export default useAudio;
