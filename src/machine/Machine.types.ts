export type MachineContext = {
  volume: number;
  rate: number;
  duration: number;
  muted: boolean;
  loop: boolean;
  error: string | null;
};

export type MachineState = {
  states: {
    initial: {};
    loading: {};
    ready: {
      states: {
        idle: {};
        playing: {};
        paused: {};
      };
    };
    ended: {};
    error: {};
  };
};

export type MachineEvent =
  | MachineLoadEvent
  | MachineReadyEvent
  | MachinePlayEvent
  | MachinePauseEvent
  | MachineStopEvent
  | MachineVolumeEvent
  | MachineRateEvent
  | MachineMuteEvent
  | MachineLoopEvent
  | MachineEndEvent
  | MachineErrorEvent
  | MachineRetryEvent;

export type MachineLoadEvent = {
  type: 'LOAD';
};

export type MachineReadyEvent = {
  type: 'READY';
  volume: number;
  rate: number;
  duration: number;
  muted: boolean;
  loop: boolean;
};

export type MachinePlayEvent = {
  type: 'PLAY';
};

export type MachinePauseEvent = {
  type: 'PAUSE';
};

export type MachineStopEvent = {
  type: 'STOP';
};

export type MachineVolumeEvent = {
  type: 'VOLUME';
  volume: number;
};

export type MachineRateEvent = {
  type: 'RATE';
  rate: number;
};

export type MachineMuteEvent = {
  type: 'MUTE';
};

export type MachineLoopEvent = {
  type: 'LOOP';
};

export type MachineEndEvent = {
  type: 'END';
};

export type MachineErrorEvent = {
  type: 'ERROR';
  error: string;
};

export type MachineRetryEvent = {
  type: 'RETRY';
};
