import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Box,
  Heading,
  Grid,
  theme,
} from "@chakra-ui/react"

import Source from "./components/Source";
import Details from "./components/Details";
import Controls from "./components/Controls";

import { useRoover } from "../src";

const src: string = "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const App = () => {
  const { onToggle } = useRoover({ src });

  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Grid templateRows="repeat(5, max-content)" templateColumns="repeat(2, 1fr)" gap={5} alignItems="center" justifyContent="center">
          <Heading as="h1" letterSpacing="-0.03em">Audio using XState</Heading>
          <Source gridRow="2 / 3" />
          <Controls />
          <Details />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
