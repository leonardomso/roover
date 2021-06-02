import * as React from "react";
import {
  Button,
  Text,
  Select,
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
  mute: boolean;
  loop: boolean;
  onVolume: (value: number) => void;
  onRate: (value: string) => void;
  onMute: () => void;
  onLoop: () => void;
  onSeek: (value: number) => void;
}

const Controls = ({ seek, volume, rate, duration, mute, loop, onVolume, onRate, onMute, onLoop, onSeek }: Props) => {
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
        <Select placeholder="Select rate" value={rate} onChange={(e: any) => onRate(e.target.value)}>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
          <option value="0.5">0.5</option>
        </Select>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Mute</Text>
        <Button type="button" onClick={onMute}>{mute ? "Unmute" : "Mute"}</Button>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Loop</Text>
        <Button type="button" onClick={onLoop}>Loop</Button>
      </Grid>
    </Grid>
  )
};

export default Controls;