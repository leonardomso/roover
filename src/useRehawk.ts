import { useContext, useState, useEffect, useRef, ChangeEvent } from 'react';
import raf from 'raf';

import RehawkContext from './RehawkContext';

import { RehawkOptions } from './types';

const useRehawk = ({
  src,
  preload = true,
  autoplay = false,
  volume = 0.5,
  muted = false,
  loop = false,
  rate = 1.0,
  onLoading = () => {},
  onReady = () => {},
  onError = () => {},
  onPlaying = () => {},
  onPaused = () => {},
  onStopped = () => {},
  onMuted = () => {},
  onLooped = () => {},
  onEnded = () => {},
}: RehawkOptions) => {
  const context = useContext(RehawkContext);

  if (context === undefined) {
    throw new Error('useRehawk can only be used inside RehawkProvider');
  }

  const {
    audio,
    load,
    loading,
    ready,
    error,
    idle,
    playing: hawkPlaying,
    paused: hawkPaused,
    stopped: hawkStopped,
    duration: hawkDuration,
    muted: hawkMuted,
    loop: hawkLoop,
    send,
  } = context;

  const ended = audio?.ended;
  if (ended) send('END');

  const [hawkVolume, setRehawkVolume] = useState<number>(volume);
  const [hawkRate, setRehawkRate] = useState<number>(rate);
  const [hawkSeek, setHawkSeek] = useState<number>(0);

  const rehawkSeekRef = useRef<number>();

  useEffect(() => {
    if (!src) return;
    if (!preload) return;
    load({ src, autoplay, volume, muted, loop, rate });
  }, [src, preload, autoplay, volume, muted, loop, rate, load]);

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime;
      setHawkSeek(seek as number);
      rehawkSeekRef.current = raf(animate);
    };

    if (audio && hawkPlaying) {
      rehawkSeekRef.current = raf(animate);
    }

    return () => {
      if (rehawkSeekRef.current) {
        raf.cancel(rehawkSeekRef.current);
      }
    };
  }, [audio, hawkPlaying, hawkStopped]);

  useEffect(() => {
    if (loading) {
      onLoading();
    }
  }, [loading]);

  useEffect(() => {
    if (ready) {
      onReady();
    }
  }, [ready]);

  useEffect(() => {
    if (error) {
      onError();
    }
  }, [error]);

  useEffect(() => {
    if (hawkPlaying) {
      onPlaying();
    }
  }, [hawkPlaying]);

  useEffect(() => {
    if (hawkPaused) {
      onPaused();
    }
  }, [hawkPaused]);

  useEffect(() => {
    if (hawkStopped) {
      onStopped();
    }
  }, [hawkStopped]);

  useEffect(() => {
    if (hawkMuted) {
      onMuted();
    }
  }, [hawkMuted]);

  useEffect(() => {
    if (hawkLoop) {
      onLooped();
    }
  }, [hawkLoop]);

  useEffect(() => {
    if (ended) {
      onEnded();
    }
  }, [ended]);

  const onToggle = () => {
    if (!audio) return;
    if (ready) audio.play();
    if (hawkPlaying) audio.pause();
  };

  const onPlay = () => {
    if (!audio) return;
    audio.play();
  };

  const onPause = () => {
    if (!audio) return;
    audio.pause();
  };

  const onStop = () => {
    if (!audio) return;
    audio.pause();
    send('STOP');
    setHawkSeek(0);
    audio.currentTime = 0;
  };

  const onMute = () => {
    if (!audio) return;
    audio.muted = !hawkMuted;
    send('MUTE');
  };

  const onLoop = () => {
    if (!audio) return;
    audio.loop = !hawkLoop;
    send('LOOP');
  };

  const onVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const volume = parseFloat(e.target.value);
    setRehawkVolume(volume);
    audio.volume = volume;
  };

  const onRate = (value: any) => {
    if (!audio) return;
    const rate = parseFloat(value);
    setRehawkRate(rate);
    audio.playbackRate = rate;
  };

  const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const seek = parseFloat(e.target.value);
    setHawkSeek(seek);
    audio.currentTime = seek;
  };

  const onForward = (value: number = 15) => {
    if (!audio) return;
    if (ended) return;
    const seek = hawkSeek + value;
    setHawkSeek(seek);
    audio.currentTime = seek;
  };

  const onBackward = (value: number = 15) => {
    if (!audio) return;
    if (idle) return;
    const seek = hawkSeek - value;
    setHawkSeek(seek);
    audio.currentTime = seek;
  };

  return {
    loading,
    ready,
    error,
    playing: hawkPlaying,
    paused: hawkPaused,
    stopped: hawkStopped,
    duration: hawkDuration,
    seek: hawkSeek,
    volume: hawkVolume,
    muted: hawkMuted,
    rate: hawkRate,
    loop: hawkLoop,
    ended,
    load,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
    onLoop,
    onVolume,
    onRate,
    onSeek,
    onForward,
    onBackward,
  };
};

export default useRehawk;
