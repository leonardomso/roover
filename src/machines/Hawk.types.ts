export type HawkMachineContext = {
  howl: Howl | null;
  muted: boolean;
  position: number | null;
  duration: number | null;
  error: string | null;
};

export type HawkMachineStateSchema = {
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

export type HawkLoadEvent = {
  type: 'LOAD';
};

export type HawkReadyEvent = {
  type: 'READY';
};

export type HawkPlayEvent = {
  type: 'PLAY';
};

export type HawkPauseEvent = {
  type: 'PAUSE';
};

export type HawkStopEvent = {
  type: 'STOP';
};

export type HawkMuteEvent = {
  type: 'MUTE';
};

export type HawkEndEvent = {
  type: 'END';
};

export type HawkErrorEvent = {
  type: 'ERROR';
  error: string;
};

export type HawkDurationEvent = {
  type: 'READY';
  howl: Howl | null;
  duration: number;
  position: number;
};

export type HawkRetryEvent = {
  type: 'RETRY';
};

export type HawkMachineEvent =
  | HawkLoadEvent
  | HawkReadyEvent
  | HawkPlayEvent
  | HawkPauseEvent
  | HawkStopEvent
  | HawkMuteEvent
  | HawkEndEvent
  | HawkErrorEvent
  | HawkDurationEvent
  | HawkRetryEvent;
