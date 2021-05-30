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

const Controls = () => {
  return (
    <Grid width="fit-content" height="auto" templateRows="repeat(auto-fill, max-content)" gridRow="5 / 6" gridColumn="1 / 2" gap={3}>
      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Seek</Text>
        <Slider
          aria-label="slider-ex-1"
          width="200px"
          defaultValue={0}
          colorScheme="blue"
          value={0}
          onChange={() => { }}
          min={0}
          max={100}
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
          value={0}
          onChange={() => { }}
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
        <Button type="button" onClick={() => { }}>Change to 0.5</Button>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Mute</Text>
        <Button type="button" onClick={() => { }}>Mute</Button>
      </Grid>

      <Grid width="fit-content" height="auto" templateColumns="60px max-content" gap={2} alignItems="center" justifyContent="center">
        <Text>Loop</Text>
        <Button type="button" onClick={() => { }}>Loop</Button>
      </Grid>
    </Grid>
  )
};

export default Controls;