import * as React from "react"
import {
  Heading,
  Button,
  Grid,
} from "@chakra-ui/react"

interface Props {
  gridRow: string;
  initial: boolean;
  loading: boolean;
  ready: boolean;
  idle: boolean;
  playing: boolean;
  paused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onToggle: () => void;
  onForward: (value: number) => void;
  onBackward: (value: number) => void;
}

const Source = ({ gridRow, onPlay, onPause, onToggle, onForward, onBackward }: Props) => {
  return (
    <Grid width="auto" height="fit-content" templateColumns="repeat(8, 1fr)" gridRow={gridRow} gridColumn="1 / 3" gap={3} alignItems="center" justifyContent="center">
      <Heading as="h2" fontSize="18px" letterSpacing="-0.03em">Source 1:</Heading>
      <Button type="button" onClick={onToggle}>Toggle</Button>
      <Button type="button" onClick={onPlay}>Play</Button>
      <Button type="button" onClick={onPause}>Pause</Button>
      <Button type="button" onClick={() => onForward(15)}>+15</Button>
      <Button type="button" onClick={() => onBackward(15)}>-15</Button>
    </Grid>
  )
};

export default Source;