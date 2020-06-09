import React, { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import { useMachine } from '@xstate/react';

import RehawkMachine from './RehawkMachine';
import RehawkContext from './RehawkContext';

import { RehawkProviderProps, RehawkOptions, RehawkTypeContext } from './types';

const RehawkProvider: React.FC<RehawkProviderProps> = ({ children }) => {
  const [current, send] = useMachine(RehawkMachine, { devTools: true });
  const [howl, setHowl] = useState<Howl | undefined>(undefined);
  const [seek, setSeek] = useState<number>(0);

  const newHowl = useCallback(
    ({
      src,
      format,
      html5,
      autoplay,
      volume,
      rate,
      preload,
    }: RehawkOptions): Howl => {
      return new Howl({
        src,
        format,
        html5,
        autoplay,
        volume,
        rate,
        preload,
      });
    },
    []
  );

  const load = useCallback(
    ({
      src,
      format,
      html5 = true,
      autoplay = false,
      volume = 1.0,
      rate = 1.0,
    }: RehawkOptions) => {
      const currentHowl = newHowl({
        src,
        format,
        html5,
        autoplay,
        volume,
        rate,
      });

      currentHowl.on('load', () => {
        if (autoplay) {
          send({
            type: 'READY',
            duration: currentHowl.duration() as number,
          });
          send('PLAY');
        } else {
          send({
            type: 'READY',
            duration: currentHowl.duration() as number,
          });
        }
      });
      currentHowl.on('loaderror', (_, error) => send({ type: 'ERROR', error }));
      currentHowl.on('play', () => send('PLAY'));
      currentHowl.on('playerror', (_, error) => send({ type: 'ERROR', error }));
      currentHowl.on('pause', () => send('PAUSE'));
      currentHowl.on('stop', () => {
        send('STOP');
        setSeek(0);
      });
      currentHowl.on('end', () => {
        send('END');
        send('RETRY');
        setSeek(0);
      });

      setHowl(currentHowl);
    },
    [newHowl]
  );

  useEffect(() => {
    return () => {
      if (!howl) return;
      howl.off();
      howl.stop();
      howl.unload();
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
    howl,
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
    seek,
    setSeek,
  };

  return (
    <RehawkContext.Provider value={context}>{children}</RehawkContext.Provider>
  );
};

export default RehawkProvider;
