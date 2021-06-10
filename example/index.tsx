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

import useRoover from "../src/hooks/useRoover/useRoover";

const src: string = "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const App = () => {
  const {
    initial,
    loading,
    ready,
    idle,
    playing,
    paused,
    end,
    seek,
    volume,
    rate,
    duration,
    mute,
    loop,
    error,
    onToggle,
    onPlay,
    onPause,
    onVolume,
    onRate,
    onMute,
    onLoop,
    onSeek,
    onForward,
    onBackward,
  } = useRoover({
    src,
    autoplay: true,
  });

  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Grid templateRows="repeat(5, max-content)" templateColumns="repeat(2, 1fr)" gap={5} alignItems="center" justifyContent="center">
          <Heading as="h1" letterSpacing="-0.03em">Roover</Heading>
          <Source
            gridRow="2 / 3"
            initial={initial}
            loading={loading}
            ready={ready}
            idle={idle}
            playing={playing}
            paused={paused}
            onPlay={onPlay}
            onPause={onPause}
            onToggle={onToggle}
            onForward={onForward}
            onBackward={onBackward}
          />

          <Controls
            seek={seek}
            volume={volume}
            rate={rate}
            duration={duration}
            mute={mute}
            loop={loop}
            onVolume={onVolume}
            onRate={onRate}
            onMute={onMute}
            onLoop={onLoop}
            onSeek={onSeek}
          />

          <Details
            initial={initial}
            loading={loading}
            ready={ready}
            idle={idle}
            playing={playing}
            paused={paused}
            end={end}
            seek={seek}
            volume={volume}
            rate={rate}
            duration={duration}
            mute={mute}
            loop={loop}
            error={error}
          />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));