import { EventObject, Interpreter, State } from 'xstate';

export type RehawkOptions = {
  src: string;
  autoplay?: boolean;
  volume?: number;
  muted?: boolean;
  loop?: boolean;
  rate?: number;
};

export type RehawkTypeContext = {
  audio: HTMLAudioElement | undefined;
  load: (args: RehawkOptions) => void;
  loading: null | boolean;
  ready: null | boolean;
  error: null | string;
  playing: null | boolean;
  paused: null | boolean;
  stopped: null | boolean;
  duration: number;
  muted: boolean;
  loop: boolean;
  send: any;
};

export type RehawkMachineContext = {
  audio: HTMLAudioElement | undefined;
  duration: number;
  muted: boolean;
  loop: boolean;
  error: string | null;
};

export type RehawkMachineStateSchema = {
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

export type RehawkErrorEvent = {
  type: 'ERROR';
  error: string;
};

export type RehawkDurationEvent = {
  type: 'READY';
  duration: number;
};

export type RehawkRetryEvent = {
  type: 'RETRY';
};

export type RehawkMachineEvent =
  | RehawkLoadEvent
  | RehawkReadyEvent
  | RehawkPlayEvent
  | RehawkPauseEvent
  | RehawkStopEvent
  | RehawkMuteEvent
  | RehawkLoopEvent
  | RehawkEndEvent
  | RehawkErrorEvent
  | RehawkDurationEvent
  | RehawkRetryEvent;

export type StateType<ContextType, EventType extends EventObject> = State<
  ContextType,
  EventType,
  any
>;
export type SendType<ContextType, EventType extends EventObject> = Interpreter<
  ContextType,
  any,
  EventType
>['send'];

export interface RehawkProviderProps {
  children: React.ReactNode;
}
