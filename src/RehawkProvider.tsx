import React, { useState, useEffect, useCallback } from 'react';
import { useMachine } from '@xstate/react';

import RehawkMachine from './RehawkMachine';
import RehawkContext from './RehawkContext';

import { RehawkProviderProps, RehawkOptions, RehawkTypeContext } from './types';

const RehawkProvider: React.FC<RehawkProviderProps> = ({ children }) => {
  const [current, send] = useMachine(RehawkMachine, { devTools: true });
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);

  const newAudio = useCallback(
    ({
      src,
      autoplay = false,
      volume = 0.5,
      muted = false,
      loop = false,
      rate = 1.0
    }: RehawkOptions): HTMLAudioElement => {
      const audioElement = new Audio(src);
      audioElement.autoplay = autoplay;
      audioElement.volume = volume;
      audioElement.defaultMuted = muted;
      audioElement.loop = loop;
      audioElement.defaultPlaybackRate = rate;
      return audioElement;
    }, []);

  const load = useCallback(
    ({
      src,
      autoplay = false,
      volume = 0.5,
      muted = false,
      loop = false,
      rate = 1.0
    }: RehawkOptions) => {
      const audio = newAudio({
        src,
        autoplay,
        volume,
        muted,
        loop,
        rate
      });

      audio?.addEventListener('abort', () => send({ type: 'ERROR', error: "Error" }))
      audio?.addEventListener('error', () => send({ type: 'ERROR', error: "Error" }));
      audio?.addEventListener('loadeddata', () => {
        if (autoplay) {
          send({
            type: 'READY',
            duration: audio.duration,
          });
          send('PLAY');
        } else {
          send({
            type: 'READY',
            duration: audio.duration,
          });
        }
      })
      audio?.addEventListener('play', () => send('PLAY'));
      audio?.addEventListener('pause', () => send('PAUSE'));
      
      setAudio(audio);
  }, [newAudio]);

  useEffect(() => {
    return () => {
      if (!audio) return;
      audio.pause();
    };
  }, []);

  const loading = current.matches('loading');
  const ready = current.matches('ready');
  const error = current.context.error;
  const playing = current.matches('ready.playing');
  const paused = current.matches('ready.paused');
  const stopped = current.matches('ready.stopped');
  const duration = current.context.duration;
  const muted = current.context.muted;
  const loop = current.context.loop;

  const context: RehawkTypeContext = {
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
