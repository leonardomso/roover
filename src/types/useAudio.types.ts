import { State } from 'xstate';
import { MachineContext, MachineEvent } from './index';

export type UseAudio = () => {
  state: State<
    MachineContext,
    MachineEvent,
    any,
    {
      value: any;
      context: MachineContext;
    }
  >;
  send: any;
  idle: boolean;
  loading: boolean;
  ready: boolean;
  readyIdle: boolean;
  playing: boolean;
  paused: boolean;
  volume: number;
  rate: number;
  duration: number;
  muted: boolean;
  loop: boolean;
  error: string | null;
  onLoad: (
    audio: HTMLAudioElement | undefined,
    args: CreateAudioArgs
  ) => Promise<HTMLAudioElement | undefined>;
  onDestroy: (audio: HTMLAudioElement | undefined) => void;
};

export type CreateAudioArgs = {
  src: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  muted?: boolean;
  loop?: boolean;
};
