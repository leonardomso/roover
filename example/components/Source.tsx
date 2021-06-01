import * as React from "react"
import {
  Heading,
  Button,
  Grid,
} from "@chakra-ui/react"

interface Props {
  gridRow: string;
  handleToggle: () => void;
}

const Source = ({ gridRow, handleToggle }: Props) => {
  return (
    <Grid width="auto" height="fit-content" templateColumns="repeat(8, 1fr)" gridRow={gridRow} gridColumn="1 / 3" gap={3} alignItems="center" justifyContent="center">
      <Heading as="h2" fontSize="18px" letterSpacing="-0.03em">Source:</Heading>
      <Button type="button" onClick={handleToggle}>Play</Button>
      <Button type="button" onClick={() => { }}>Pause</Button>
      <Button type="button" onClick={() => { }}>Stop</Button>
      <Button type="button" onClick={() => { }}>Toggle</Button>
      <Button type="button" onClick={() => { }}>+15</Button>
      <Button type="button" onClick={() => { }}>-15</Button>
    </Grid>
  )
};

export default Source;