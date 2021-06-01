import { State } from 'xstate';

import { MachineContext, MachineEvent } from '../../types/index';

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
  onCreateAudio: (args: CreateAudioArgs) => HTMLAudioElement;
  onLoadAudio: (
    audio: HTMLAudioElement | undefined,
    args: CreateAudioArgs
  ) => HTMLAudioElement | undefined;
  onDestroyAudio: (audio: HTMLAudioElement | undefined) => void;
};

export interface CreateAudioArgs {
  src: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  muted?: boolean;
  loop?: boolean;
}
