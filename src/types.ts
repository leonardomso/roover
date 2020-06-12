export type RehawkOptions = {
  src?: string;
  preload?: boolean;
  autoplay?: boolean;
  volume?: number;
  muted?: boolean;
  loop?: boolean;
  rate?: number;
};

export type RehawkStateContext = {
  audio: HTMLAudioElement | null;
  load: (args: RehawkOptions) => void;
  loading: boolean;
  ready: boolean;
  error: string | null;
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  duration: number;
  muted: boolean;
  loop: boolean;
  send: any;
};

export type RehawkMachineContext = {
  audio: HTMLAudioElement | null;
  duration: number;
  muted: boolean;
  loop: boolean;
  error: string | null;
};

export type RehawkMachineState = {
  states: {
    loading: {};
    ready: {
      states: {
        idle: {};
        playing: {};
        paused: {};
        stopped: {};
        ended: {};
        error: {};
      };
    };
    error: {};
  };
};

export type RehawkLoadEvent = {
  type: 'LOAD';
};

export type RehawkReadyEvent = {
  type: 'READY';
};

export type RehawkPlayEvent = {
  type: 'PLAY';
};

export type RehawkPauseEvent = {
  type: 'PAUSE';
};

export type RehawkStopEvent = {
  type: 'STOP';
};

export type RehawkMuteEvent = {
  type: 'MUTE';
};

export type RehawkLoopEvent = {
  type: 'LOOP';
};

export type RehawkEndEvent = {
  type: 'END';
};

export type RehawkOnErrorEvent = {
  type: 'ERROR';
  error: string;
};

export type RehawkOnReadyEvent = {
  type: 'READY';
  duration: number;
  muted: boolean;
  loop: boolean;
};

export type RehawkRetryEvent = {
  type: 'RETRY';
};

export type RehawkMachineEvents =
  | RehawkLoadEvent
  | RehawkReadyEvent
  | RehawkPlayEvent
  | RehawkPauseEvent
  | RehawkStopEvent
  | RehawkMuteEvent
  | RehawkLoopEvent
  | RehawkEndEvent
  | RehawkOnErrorEvent
  | RehawkOnReadyEvent
  | RehawkRetryEvent;

export interface RehawkProviderProps {
  children: React.ReactNode;
}

export interface RehawkState {
  playing: boolean;
}
