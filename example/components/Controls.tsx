import * as React from "react";
import {
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
} from "@chakra-ui/react";

interface Props {
  seek: number;
  volume: number;
  rate: number;
  duration: number;
  muted: boolean;
  loop: boolean;
  onVolume: (value: number) => void;
  onRate: (value: string) => void;
  onMute: () => void;
  onLoop: () => void;
  onSeek: (value: number) => void;
}

const Controls = ({ seek, volume, rate, duration, muted, loop, onVolume, onRate, onMute, onLoop, onSeek }: Props) => {
  return (
    <Grid width="fit-content" height="auto" templateRows="repeat(auto-fill, max-content)" gridRow="5 / 6" gridColumn="1 / 2" gap={3}>
      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Seek</Text>
        <Slider
          aria-label="slider-ex-1"
          width="200px"
          colorScheme="blue"
          value={seek}
          onChange={onSeek}
          min={0}
          max={duration}
          step={0.1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Volume</Text>
        <Slider
          aria-label="slider-ex-1"
          width="200px"
          colorScheme="blue"
          value={volume}
          onChange={onVolume}
          min={0}
          max={1}
          step={0.1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Rate</Text>
        <Button type="button" onClick={() => onRate("0.5")}>Change to 0.5</Button>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Mute</Text>
        <Button type="button" onClick={onMute}>Mute</Button>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Loop</Text>
        <Button type="button" onClick={onLoop}>Loop</Button>
      </Grid>
    </Grid>
  )
};

export default Controls;