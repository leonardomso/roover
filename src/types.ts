import { SetStateAction } from 'react';
import { EventObject, Interpreter, State } from 'xstate';

export type HawkOptions = {
  src: string | string[];
  format?: string | string[];
  html5?: boolean;
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  preload?: boolean;
};

export type HawkTypeContext = {
  howl: Howl | undefined;
  load: (args: HawkOptions) => void;
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
  seek: number;
  setSeek: (value: SetStateAction<number>) => void;
};

export type HawkMachineContext = {
  howl: Howl | null;
  duration: number;
  muted: boolean;
  loop: boolean;
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

export type HawkLoopEvent = {
  type: 'LOOP';
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
  duration: number;
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
  | HawkLoopEvent
  | HawkEndEvent
  | HawkErrorEvent
  | HawkDurationEvent
  | HawkRetryEvent;

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

export interface HawkProviderProps {
  children: React.ReactNode;
}

export type MachineContext<
  ContextType,
  EventType extends EventObject
> = React.Context<{
  state: StateType<ContextType, EventType>;
  send: SendType<ContextType, EventType>;
} | null>;

export type MachineProps<ContextType, EventType extends EventObject> = {
  machine: MachineContext<ContextType, EventType>;
};
