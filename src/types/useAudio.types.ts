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
  audio: HTMLAudioElement | null;
  seek: number;
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
  onLoad: (args: CreateAudioArgs) => Promise<void>;
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
