export type RooverOptions = {
  src?: string;
  preload?: boolean;
  autoplay?: boolean;
  volume?: number;
  muted?: boolean;
  loop?: boolean;
  rate?: number;
  onLoading?: () => void;
  onReady?: () => void;
  onError?: () => void;
  onPlaying?: () => void;
  onPaused?: () => void;
  onStopped?: () => void;
  onMuted?: () => void;
  onLooped?: () => void;
  onEnded?: () => void;
};

export type RooverStateContext = {
  audio: HTMLAudioElement | null;
  load: (args: RooverOptions) => void;
  loading: boolean;
  ready: boolean;
  error: string | null;
  idle: boolean;
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  duration: number;
  muted: boolean;
  loop: boolean;
  send: any;
};

export type RooverMachineContext = {
  audio: HTMLAudioElement | null;
  duration: number;
  muted: boolean;
  loop: boolean;
  error: string | null;
};

export type RooverMachineState = {
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

export type RooverLoadEvent = {
  type: 'LOAD';
};

export type RooverReadyEvent = {
  type: 'READY';
};

export type RooverPlayEvent = {
  type: 'PLAY';
};

export type RooverPauseEvent = {
  type: 'PAUSE';
};

export type RooverStopEvent = {
  type: 'STOP';
};

export type RooverMuteEvent = {
  type: 'MUTE';
};

export type RooverLoopEvent = {
  type: 'LOOP';
};

export type RooverEndEvent = {
  type: 'END';
};

export type RooverOnErrorEvent = {
  type: 'ERROR';
  error: string;
};

export type RooverOnReadyEvent = {
  type: 'READY';
  duration: number;
  muted: boolean;
  loop: boolean;
};

export type RooverRetryEvent = {
  type: 'RETRY';
};

export type RooverMachineEvents =
  | RooverLoadEvent
  | RooverReadyEvent
  | RooverPlayEvent
  | RooverPauseEvent
  | RooverStopEvent
  | RooverMuteEvent
  | RooverLoopEvent
  | RooverEndEvent
  | RooverOnErrorEvent
  | RooverOnReadyEvent
  | RooverRetryEvent;

export interface RooverProviderProps {
  children: React.ReactNode;
}

export interface RooverState {
  playing: boolean;
}
