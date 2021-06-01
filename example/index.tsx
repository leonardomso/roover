import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Box,
  Heading,
  Grid,
  theme,
} from "@chakra-ui/react";

import Source from "./components/Source";
import Details from "./components/Details";
import Controls from "./components/Controls";

import { useRoover } from "../src/";

const src: string = "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const App = () => {
  const {
    idle,
    loading,
    ready,
    playing,
    paused,
    ended,
    seek,
    volume,
    rate,
    duration,
    muted,
    loop,
    error,
    onToggle,
    onPlay,
    onPause,
    onForward,
    onBackward,
  } = useRoover({ src });

  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Grid templateRows="repeat(5, max-content)" templateColumns="repeat(2, 1fr)" gap={5} alignItems="center" justifyContent="center">
          <Heading as="h1" letterSpacing="-0.03em">Roover</Heading>
          <Source
            gridRow="2 / 3"
            idle={idle}
            loading={loading}
            ready={ready}
            onPlay={onPlay}
            onPause={onPause}
            onToggle={onToggle}
            onForward={onForward}
            onBackward={onBackward}
          />
          <Controls />
          <Details
            idle={idle}
            loading={loading}
            ready={ready}
            playing={playing}
            paused={paused}
            ended={ended}
            seek={seek}
            volume={volume}
            rate={rate}
            duration={duration}
            muted={muted}
            loop={loop}
            error={error}
          />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));