export type Args = {
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
};
