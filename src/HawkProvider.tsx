import React, { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import { useMachine } from '@xstate/react';

import HawkMachine from './HawkMachine';
import HawkContext from './HawkContext';

import { HawkProviderProps, HawkOptions, HawkTypeContext } from './types';

const HawkProvider: React.FC<HawkProviderProps> = ({ children }) => {
  const [current, send] = useMachine(HawkMachine, { devTools: true });
  const [howl, setHowl] = useState<Howl | undefined>(undefined);
  const [seek, setSeek] = useState<number>(0);

  const newHowl = ({ src, format, html5, preload, autoplay }: any): Howl => {
    return new Howl({
      src,
      format,
      html5,
      preload,
      autoplay,
    });
  };

  const load = useCallback(
    ({
      src,
      format,
      html5 = true,
      autoplay = false,
      defaultVolume = 1.0,
      defaultRate = 1.0,
    }: HawkOptions) => {
      const currentHowl = newHowl({
        src,
        format,
        html5,
        preload: true,
        autoplay,
        volume: defaultVolume,
        rate: defaultRate,
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
      currentHowl.on('loaderror', (_, message) =>
        send({ type: 'ERROR', error: message })
      );
      currentHowl.on('play', () => send('PLAY'));
      currentHowl.on('playerror', (_, message) =>
        send({ type: 'ERROR', error: message })
      );
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

  const context: HawkTypeContext = {
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
    <HawkContext.Provider value={context}>{children}</HawkContext.Provider>
  );
};

export default HawkProvider;
