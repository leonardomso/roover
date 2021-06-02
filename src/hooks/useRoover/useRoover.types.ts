export interface Args {
  src: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  mute?: boolean;
  loop?: boolean;
}

export type ReturnArgs = {
  initial: boolean;
  loading: boolean;
  ready: boolean;
  idle: boolean;
  playing: boolean;
  paused: boolean;
  ended: boolean;
  seek: number;
  volume: number;
  rate: number;
  duration: number;
  mute: boolean;
  loop: boolean;
  error: string | null;
  onToggle: () => void;
  onPlay: () => void;
  onPause: () => void;
  onVolume: () => void;
  onRate: (value: string) => void;
  onMute: () => void;
  onLoop: () => void;
  onSeek: () => void;
  onForward: (value: number) => void;
  onBackward: (value: number) => void;
};
