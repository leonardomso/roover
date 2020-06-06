export type HawkMachineContext = {
  muted: boolean;
  position: number | null;
  duration: number | null;
  seek: (position?: number) => number | undefined;
  error: null | string;
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

export type HawkMachineEvent =
  | { type: 'LOAD' }
  | { type: 'READY' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'MUTE' }
  | { type: 'END' }
  | { type: 'ERROR'; error?: string }
  | { type: 'RETRY' };
