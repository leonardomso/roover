export interface Args {
  src: string;
  preload?: 'auto' | 'metadata' | 'none';
  autoplay?: boolean;
  volume?: number;
  rate?: number;
  muted?: boolean;
  loop?: boolean;
  onLoading?: () => void;
  onReady?: () => void;
  onPlaying?: () => void;
  onPause?: () => void;
  onVolume?: () => void;
  onRate?: () => void;
  onMute?: () => void;
  onLoop?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export type ReturnArgs = {
  idle: boolean;
  loading: boolean;
  ready: boolean;
  playing: boolean;
  paused: boolean;
  ended: boolean;
  seek: number;
  volume: number;
  rate: number;
  duration: number;
  muted: boolean;
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
