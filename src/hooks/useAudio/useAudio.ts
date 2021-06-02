import { useMachine } from '@xstate/react';

import RooverMachine from '../../machine/Machine';

import {
  UseAudio,
  CreateAudioArgs,
  MachineContext,
  MachineEvent,
} from '../../types';

const useAudio: UseAudio = () => {
  const [state, send] = useMachine<MachineContext, MachineEvent>(
    RooverMachine,
    { devTools: process.env.NODE_ENV === 'development' }
  );

  /**
   * Create a new Audio element and returns it.
   * @param {string} src - The src of the audio to be loaded.
   * @param {string} preload - The preload property for the audio.
   * @param {boolean} autoplay - The autoplay property for the audio.
   * @param {number} volume - The volume property for the audio.
   * @param {number} rate - The rate property for the audio.
   * @param {boolean} muted - The muted property for the audio.
   * @param {boolean} loop - The loop property for the audio.
   * @returns HTMLAudioElement
   */
  const onCreateAudio = ({
    src = '',
    preload = 'auto',
    autoplay = false,
    volume = 1.0,
    rate = 1.0,
    mute = false,
    loop = false,
  }: CreateAudioArgs): HTMLAudioElement => {
    const audioElement: HTMLAudioElement = new Audio(src);

    // Autoplay should be 'false' by default.
    // Read more here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay
    audioElement.autoplay = autoplay ? autoplay : false;
    audioElement.volume = volume ? volume : 1.0;
    audioElement.muted = mute ? mute : false;
    audioElement.loop = loop ? loop : false;
    audioElement.playbackRate = rate ? rate : 1.0;
    audioElement.preload = preload ? preload : 'auto';

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
    // When the audio has a loading error, it will trigger a 'ERROR' event.
    audioElement.addEventListener('error', () => {
      send('ERROR', {
        error: `Error while loading: ${src}`,
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
    // When the volume has changed, will trigger a 'VOLUME' event and set the new value in the context.
    audioElement.addEventListener('volumechange', () => {
      send('VOLUME', {
        volume: audioElement.volume,
      });
    });
    // When the rate has changed, it will trigger a 'RATE' event and set the new value in the context.
    audioElement.addEventListener('ratechange', () => {
      send('RATE', {
        rate: audioElement.playbackRate,
      });
    });
    // When the audio has ended, it will trigger a 'END' event.
    audioElement.addEventListener('ended', () => {
      send('END');
    });

    return audioElement;
  };

  /**
   * Check if there are any audio available.
   * If there's no audio available, it creates a new one and returns it.
   * If there's a current audio available, checks if the src of the current audio is equal to the new audio that's trying to be loaded.
   *  In case the src is the same, it returns the audio. Otherwise, it replaces the src of the current audio with the new src.
   * @param {HTMLAudioElement | undefined} audio - The audio element.
   * @param {CreateAudioArgs} args - Object to pass to Audio element.
   * @returns HTMLAudioElement | undefined
   */
  const onLoadAudio = (
    audio: HTMLAudioElement | undefined,
    args: CreateAudioArgs
  ): HTMLAudioElement => {
    if (audio instanceof HTMLAudioElement) {
      const currentSrc: string = audio.currentSrc;

      if (currentSrc === args.src) {
        return audio;
      }

      send('LOAD');
      audio.setAttribute('src', audio.src);
      audio.load();
      return audio;
    } else {
      const newAudio: HTMLAudioElement = onCreateAudio(args);
      return newAudio;
    }
  };

  /**
   * Destroy audio element.
   * @param audio - The audio element to be checked.
   * @returns undefined
   */
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
