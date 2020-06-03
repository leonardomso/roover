export type UseHawk = (
  src: string | string[],
  format?: string,
  html5?: boolean,
  preload?: boolean,
  autoplay?: boolean
) => void;

export interface HawkOptions {
  src: string | string[];
  format?: string;
  html?: boolean;
  preload?: boolean;
  ready: boolean;
  loading: boolean;
  volume: number;
  mute: boolean;
  loop: boolean;
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  seek: () => any;
  rate: () => any;
  onToggle: () => any;
  onPlay: () => any;
  onPause: () => any;
  onStop: () => any;
  onMute: () => any;
  onSeek: () => any;
}
