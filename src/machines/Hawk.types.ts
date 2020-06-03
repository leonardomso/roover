export type HawkContext = {};

export type HawkStateSchema = {
  states: {
    idle: {};
    loading: {};
    ready: {
      states: {
        idle: {};
        playing: {};
        paused: {};
        stopped: {};
        ended: {};
      };
    };
    error: {};
  };
};

export type HawkEvent =
  | { type: 'LOAD' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'END' }
  | { type: 'RETRY' };
