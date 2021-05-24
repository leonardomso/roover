import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMachine } from '@xstate/react';

import RooverMachine from './RooverMachine';
import RooverContext from './RooverContext';

import {
  RooverProviderProps,
  RooverOptions,
  RooverStateContext,
} from './types';

const RooverProvider = ({ children }: RooverProviderProps) => {
  const [current, send] = useMachine(RooverMachine, { devTools: true });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const loading = current.matches('loading');
  const ready = current.matches('ready');
  const error = current.context.error;
  const idle = current.matches('ready.idle');
  const playing = current.matches('ready.playing');
  const paused = current.matches('ready.paused');
  const stopped = current.matches('ready.stopped');
  const duration = current.context.duration;
  const muted = current.context.muted;
  const loop = current.context.loop;

  const rehawkRef = useRef<HTMLAudioElement | null>();
  const previousRooverRef = useRef<HTMLAudioElement | null>();

  const newAudio = useCallback(
    ({
      src,
      autoplay = false,
      volume = 0.5,
      muted = false,
      loop = false,
      rate = 1.0,
    }: RooverOptions): HTMLAudioElement => {
      const audioElement = new Audio(src);
      audioElement.autoplay = autoplay;
      audioElement.volume = volume;
      audioElement.muted = muted;
      audioElement.loop = loop;
      audioElement.playbackRate = rate;
      return audioElement;
    },
    []
  );

  const load = useCallback(
    ({ src, preload, autoplay, volume, muted, loop, rate }: RooverOptions) => {
      if (rehawkRef.current) {
        if (rehawkRef.current.currentSrc === src) return;

        if (loading) {
          previousRooverRef.current = rehawkRef.current;
          previousRooverRef.current.addEventListener('loadeddata', () => {
            previousRooverRef.current = null;
          });
        }

        rehawkRef.current.addEventListener('playing', () => {
          rehawkRef.current?.pause();
          rehawkRef.current = null;
        });
      }

      const newAudioElement = newAudio({
        src,
        preload,
        autoplay,
        volume,
        muted,
        loop,
        rate,
      });

      newAudioElement.addEventListener('abort', () =>
        send({ type: 'ERROR', error: 'Error' })
      );
      newAudioElement.addEventListener('error', () =>
        send({ type: 'ERROR', error: 'Error' })
      );
      newAudioElement.addEventListener('loadeddata', () => {
        if (autoplay) {
          send({
            type: 'READY',
            duration: newAudioElement.duration,
            muted,
            loop,
          });
          send('PLAY');
        } else {
          send({
            type: 'READY',
            duration: newAudioElement.duration,
            muted,
            loop,
          });
        }
      });
      newAudioElement.addEventListener('play', () => send('PLAY'));
      newAudioElement.addEventListener('pause', () => send('PAUSE'));

      setAudio(newAudioElement);
      rehawkRef.current = newAudioElement;
    },
    [newAudio]
  );

  useEffect(() => {
    return () => {
      if (!rehawkRef.current) return;
      if (rehawkRef.current) {
        rehawkRef.current.pause();
        rehawkRef.current.removeAttribute('src');
      }
    };
  }, []);

  const context: RooverStateContext = {
    audio,
    load,
    loading,
    ready,
    error,
    idle,
    playing,
    paused,
    stopped,
    duration,
    muted,
    loop,
    send,
  };

  return (
    <RooverContext.Provider value={context}>{children}</RooverContext.Provider>
  );
};

export default RooverProvider;
