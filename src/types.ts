export type UseHawk = (
  src: string | string[],
  format?: string | string[],
  html5?: boolean,
  preload?: boolean,
  autoplay?: boolean
) => void;

export type HawkError = {
  message: string;
};

export interface HawkOptions {
  src: string | string[];
  format?: string;
  html5?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  defaultVolume?: number;
  defaultRate?: number;
}

export interface HawkAudioContext {
  ready: null | boolean;
  loading: null | boolean;
  error: null | HawkError;
  playing: null | boolean;
  paused: null | boolean;
  stopped: null | boolean;
  duration: null | number;
  position: null | number;
  ended: null | boolean;
  player: null | Howl;
  load: (args: HawkOptions) => void | null;
}
