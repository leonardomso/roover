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

export type HawkMachineEvent =
  | { type: 'LOAD' }
  | { type: 'READY' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'MUTE' }
  | { type: 'END' }
  | { type: 'ERROR'; error: string }
  | { type: 'READY'; howl: Howl | null; duration: number | undefined }
  | { type: 'RETRY' };
