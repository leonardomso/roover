import * as React from "react";
import {
  Heading,
  Text,
  Grid,
} from "@chakra-ui/react";

import formatTime from "../utils/formatTime";

interface Props {
  initial: boolean;
  loading: boolean;
  ready: boolean;
  idle: boolean;
  playing: boolean;
  paused: boolean;
  end: boolean;
  seek: number;
  volume: number;
  rate: number;
  duration: number;
  mute: boolean;
  loop: boolean;
  error: string | null;
}

const Details = ({ initial, loading, ready, idle, playing, paused, end, seek, volume, rate, duration, mute, loop, error }: Props) => {
  return (
    <Grid width="fit-content" height="auto" templateColumns="1fr 1fr" templateRows="repeat(3, max-content)" gridRow="5 / 6" gridColumn="2 / 3" gap={6} alignItems="center" justifyContent="center">
      <Heading as="h2" fontSize="18px" letterSpacing="-0.03em">State</Heading>

      <Grid width="fit-content" height="auto" templateRows="repeat(7, max-content)" gridRow="2 / 3" gridColumn="1 / 2" gap={2} alignItems="center" justifyContent="center">
        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Initial: </Text>
          <Text fontWeight="bold">{`${initial}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Loading: </Text>
          <Text fontWeight="bold">{`${loading}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Ready: </Text>
          <Text fontWeight="bold">{`${ready}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Idle: </Text>
          <Text fontWeight="bold">{`${idle}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Playing: </Text>
          <Text fontWeight="bold">{`${playing}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Paused: </Text>
          <Text fontWeight="bold">{`${paused}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>End: </Text>
          <Text fontWeight="bold">{`${end}`}</Text>
        </Grid>
      </Grid>

      <Grid width="fit-content" height="auto" templateRows="repeat(7, max-content)" gridRow="2 / 3" gridColumn="2 / 3" gap={2} alignItems="center" justifyContent="center">
        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Seek: </Text>
          <Text fontWeight="bold">{formatTime(seek)}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Volume: </Text>
          <Text fontWeight="bold">{`${volume}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Rate: </Text>
          <Text fontWeight="bold">{`${rate}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Duration: </Text>
          <Text fontWeight="bold">{`${duration}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Mute: </Text>
          <Text fontWeight="bold">{`${mute}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Loop: </Text>
          <Text fontWeight="bold">{`${loop}`}</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Error: </Text>
          <Text fontWeight="bold">{`${error}`}</Text>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default Details;