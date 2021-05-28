type UseRoover = (
  src?: string,
  preload?: boolean,
  autoplay?: boolean,
  volume?: number,
  rate?: number,
  muted?: boolean,
  loop?: boolean,
  onLoading?: () => void,
  onReady?: () => void,
  onPlaying?: () => void,
  onPause?: () => void,
  onVolume?: () => void,
  onRate?: () => void,
  onMute?: () => void,
  onLoop?: () => void,
  onEnd?: () => void,
  onError?: () => void
) => any;

const useRoover: UseRoover = () => {};

export default useRoover;
