import { Interpreter } from 'xstate';

import { MachineContext, MachineEvent } from '../../types/index';

export type UseAudio = () => {
  service: Interpreter<MachineContext, any, MachineEvent>;
  onCreateAudio: (args: CreateAudioArgs) => HTMLAudioElement;
  onLoadAudio: (
    audio: HTMLAudioElement | undefined,
    args: CreateAudioArgs
  ) => HTMLAudioElement;
  onDestroyAudio: (audio: HTMLAudioElement | undefined) => void;
};

export interface CreateAudioArgs {
  src: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  mute?: boolean;
  loop?: boolean;
}
