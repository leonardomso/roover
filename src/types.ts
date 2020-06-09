import { ChangeEvent } from 'react';
import { EventObject, Interpreter, State } from 'xstate';

export type HawkError = {
  message: string;
};

export interface HawkOptions {
  src: string | string[];
  format?: string | string[];
  html5?: boolean;
  autoplay?: boolean;
  defaultVolume?: number;
  defaultRate?: number;
}

export type HawkTypeContext = {
  loading: null | boolean;
  ready: null | boolean;
  error: null | HawkError;
  playing: null | boolean;
  paused: null | boolean;
  stopped: null | boolean;
  duration: null | number;
  position: null | number;
  volume: null | number;
  rate: null | number;
  muted: boolean;
  loop: boolean;
  onToggle: () => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onMute: () => void;
  onLoop: () => void;
  onPosition: (e: ChangeEvent<HTMLInputElement>) => void;
  onVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  onRate: (e: ChangeEvent<HTMLInputElement>) => void;
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
  howl: Howl;
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
  value: HawkTypeContext;
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
