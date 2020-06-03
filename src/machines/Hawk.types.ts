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
        ended: {};
      };
    };
  };
};

export type HawkEvent =
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "END" }
  | { type: "RETRY" };
