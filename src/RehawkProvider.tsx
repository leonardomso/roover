import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMachine } from '@xstate/react';

import RehawkMachine from './RehawkMachine';
import RehawkContext from './RehawkContext';

import {
  RehawkProviderProps,
  RehawkOptions,
  RehawkStateContext,
} from './types';

const RehawkProvider: React.FC<RehawkProviderProps> = ({ children }) => {
  const [current, send] = useMachine(RehawkMachine, { devTools: true });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const loading = current.matches('loading');
  const ready = current.matches('ready');
  const error = current.context.error;
  const playing = current.matches('ready.playing');
  const paused = current.matches('ready.paused');
  const stopped = current.matches('ready.stopped');
  const duration = current.context.duration;
  const muted = current.context.muted;
  const loop = current.context.loop;

  const rehawkRef = useRef<HTMLAudioElement | null>();
  const previousRehawkRef = useRef<HTMLAudioElement | null>();

  const newAudio = useCallback(
    ({
      src,
      autoplay = false,
      volume = 0.5,
      muted = false,
      loop = false,
      rate = 1.0,
    }: RehawkOptions): HTMLAudioElement => {
      const audioElement = new Audio(src);
      audioElement.autoplay = autoplay;
      audioElement.volume = volume;
      audioElement.defaultMuted = muted;
      audioElement.loop = loop;
      audioElement.defaultPlaybackRate = rate;
      return audioElement;
    },
    []
  );

  const load = useCallback(
    ({
      src,
      preload = true,
      autoplay = false,
      volume = 0.5,
      muted = false,
      loop = false,
      rate = 1.0,
    }: RehawkOptions) => {
      if (rehawkRef.current) {
        if (rehawkRef.current.currentSrc === src) return;

        if (loading) {
          previousRehawkRef.current = rehawkRef.current;
          previousRehawkRef.current.addEventListener('loadeddata', () => {
            previousRehawkRef.current = null;
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

      newAudioElement?.addEventListener('abort', () =>
        send({ type: 'ERROR', error: 'Error' })
      );
      newAudioElement?.addEventListener('error', () =>
        send({ type: 'ERROR', error: 'Error' })
      );
      newAudioElement?.addEventListener('loadeddata', () => {
        if (autoplay) {
          send({
            type: 'READY',
            duration: newAudioElement.duration,
          });
          send('PLAY');
        } else {
          send({
            type: 'READY',
            duration: newAudioElement.duration,
          });
        }
      });
      newAudioElement?.addEventListener('play', () => send('PLAY'));
      newAudioElement?.addEventListener('pause', () => send('PAUSE'));

      setAudio(newAudioElement);
      rehawkRef.current = newAudioElement;
    },
    [newAudio]
  );

  useEffect(() => {
    return () => {
      if (!audio) return;
      audio.pause();
    };
  }, []);

  const context: RehawkStateContext = {
    audio,
    load,
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    duration,
    muted,
    loop,
    send,
  };

  return (
    <RehawkContext.Provider value={context}>{children}</RehawkContext.Provider>
  );
};

export default RehawkProvider;
