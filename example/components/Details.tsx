import * as React from "react";
import {
  Heading,
  Text,
  Grid,
} from "@chakra-ui/react";

const Details = () => {
  return (
    <Grid width="fit-content" height="auto" templateColumns="1fr 1fr" templateRows="repeat(3, max-content)" gridRow="5 / 6" gridColumn="2 / 3" gap={3} alignItems="center" justifyContent="center">
      <Heading as="h2" fontSize="18px" letterSpacing="-0.03em">State</Heading>

      <Grid width="fit-content" height="auto" templateRows="repeat(5, max-content)" gridRow="2 / 3" gridColumn="1 / 2" gap={2} alignItems="center" justifyContent="center">
        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Loading: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Ready: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Playing: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Paused: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Stopped: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>
      </Grid>

      <Grid width="fit-content" height="auto" templateRows="repeat(5, max-content)" gridRow="2 / 3" gridColumn="2 / 3" gap={2} alignItems="center" justifyContent="center">
        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Loop: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Volume: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Seek: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Rate: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>

        <Grid width="fit-content" height="auto" templateColumns="70px max-content" gap={2} alignItems="center" justifyContent="center">
          <Text>Ended: </Text>
          <Text fontWeight="bold">false</Text>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default Details;