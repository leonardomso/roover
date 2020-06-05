export type HawkMachineContext = {
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
  | { type: 'END' }
  | { type: 'ERROR'; error?: string }
  | { type: 'RETRY' };
