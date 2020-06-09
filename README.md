
# Rehawk

[![Actions Status](https://github.com/leonardomso/rehawk/workflows/CI/badge.svg)](https://github.com/leonardomso/rehawk/actions)
[![LICENSE MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/leonardomso/rehawk)
[![npm](https://img.shields.io/npm/v/rehawk.svg)](https://npmjs.org/package/rehawk)
[![dependencies](https://david-dm.org/leonardomso/rehawk.svg)](https://david-dm.org/leonardomso/rehawk)

Work with audio in React it's painful sometimes, that's why this library was created. A custom React hook powered by the JavaScript audio library called [Howler.js](https://howlerjs.com/) library.

Using only a custom React hook and finite-state machine using XState, this library aims to solve a few points when developers want to work with audio in React. It provides a few functions and properties so you don't need to waste time trying to figure out how to get that specific value.

The **only** feature now that needs to be implemented is to figure out how to update the *seek* property smoothly using the RAF library without breaking the *seek* property. 

Feel free to submit a PR.

## Install

```bash
yarn add rehawk
```

## Usage

All you need to do is import the `RehawkProvider` context and the `useRehawk` hook. Context was the best choice here because sometimes we might want to use different properties of our custom hook in different components in our React tree.

The following is a very basic usage example of Rehawk. If you want the most complete example of Rehawk working, click here.

```typescript
import React from "react"
import { RehawkProvider, useRehawk } from "rehawk"

const src = "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3";

const Player = () => {
	const {
		ready,
		loading,
		error,
		playing,
		paused,
		stopped
	} = useRehawk({
		src,
		autoplay: false
	});
	
	return (
		<div>
			<p>Ready: {ready ? "true" : "false"}</p>
			<p>Loading: {loading ? "true" : "false"}</p>
			<p>Error: {error}</p>
			<p>Playing: {playing ? "true" : "false"}</p>
			<p>Paused: {paused ? "true" : "false"}</p>
			<p>Stopped: {stopped ? "true" : "false"}</p>
		</div>
	);
};

const App = () => {
    return (
        <RehawkProvider>
            <Player />
        </RehawkProvider>
    )
}
```

## API

### Props

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
  </tr>
  <tr>
    <td><code>src</code></td>
    <td><code>string | string[]</code></td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>format</code></td>
    <td><code>string | string[]</code></td>
    <td><code>false</code></td>
  </tr>
    <tr>
    <td><code>html5</code></td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
   <tr>
    <td><code>autoplay</code></td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
   <tr>
    <td><code>volume</code></td>
    <td><code>number (0.0 to 1.0)</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>rate</code></td>
    <td><code>number (0.5 to 4.0, with 1.0 being normal speed)</code></td>
    <td><code>false</code></td>
  </tr>
</table>

### Returned values

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>loading</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if the audio is been loaded.</code>
    </td>
  </tr>
  <tr>
    <td><code>ready</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if the audio is ready to be played.</code>
    </td>
  </tr>
  <tr>
    <td><code>error</code></td>
    <td><code>string | null</code></td>
    <td>
    <code>Return a string if any error occurs, otherwise returns null.</code>
    </td>
  </tr>
  <tr>
    <td><code>playing</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if audio is been played.</code>
    </td>
  </tr>
  <tr>
    <td><code>paused</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if audio is paused.</code>
    </td>
  </tr>
  <tr>
    <td><code>stopped</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if audio is stopped.</code>
    </td>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td><code>number</code></td>
    <td>
    <code>Return the duration of the actual audio, in case there's no audio it returns 0.</code>
    </td>
  </tr>
    <tr>
    <td><code>seek</code></td>
    <td><code>number</code></td>
    <td>
    <code>Return the seek of the actual audio, in case there's no audio it returns 0.</code>
    </td>
  </tr>
    <tr>
    <td><code>volume</code></td>
    <td><code>number</code></td>
    <td>
    <code>Return the volume of the actual audio, in case there's no audio it returns 0.</code>
    </td>
  </tr>
    <tr>
    <td><code>rate</code></td>
    <td><code>number</code></td>
    <td>
    <code>Return the rate of the audio, in case there's no audio it returns 0.</code>
    </td>
  </tr>
   <tr>
    <td><code>muted</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if the audio is muted.</code>
    </td>
  </tr>
   <tr>
    <td><code>loop</code></td>
    <td><code>boolean</code></td>
    <td>
    <code>Return true if the audio is set to loop forever.</code>
    </td>
  </tr>
</table>

### Returned methods

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>onToggle</code></td>
    <td><code>() => void</code></td>
    <td>
    <code>Switch between playing and paused.</code>
    </td>
  </tr>
  <tr>
    <td><code>onPlay</code></td>
    <td><code>() => void</code></td>
    <td>
    <code>Set playing to true.</code>
    </td>
  </tr>
  <tr>
    <td><code>onPause</code></td>
    <td><code>() => void</code></td>
    <td>
    <code>Set paused to true.</code>
    </td>
  </tr>
  <tr>
    <td><code>onStop</code></td>
    <td><code>() => void</code></td>
    <td>
    <code>Set stopped to true.</code>
    </td>
  </tr>
  <tr>
    <td><code>onMute</code></td>
    <td><code>() => void</code></td>
    <td>
    <code>Set muted to the opposite actual value.</code>
    </td>
  </tr>
  <tr>
    <td><code>onLoop</code></td>
    <td><code>() => void</code></td>
    <td>
    <code>Set loop to the opposite actual value.</code>
    </td>
  </tr>
  <tr>
    <td><code>onSeek</code></td>
    <td><code>(e:  React.ChangeEvent<HTMLInputElement>) =>  void</code></td>
    <td>
    <code>Change seek to a specific value (recommended to be used in a input element).</code>
    </td>
  </tr>
     <tr>
    <td><code>onVolume</code></td>
    <td><code>(e:  React.ChangeEvent<HTMLInputElement>) =>  void</code></td>
    <td>
    <code>Change volume to a specific value (recommended to be used in a input element).</code>
    </td>
  </tr>
   <tr>
    <td><code>onRate</code></td>
    <td><code>(e:  React.ChangeEvent<HTMLInputElement>) =>  void</code></td>
    <td>
    <code>Change rate to a specific value (recommended to be used in a input element).</code>
    </td>
  </tr>
</table>


## Example

To run the example do the following steps:

1. `git clone` the repository
2. `cd rehawk/example`
3. `yarn install`
4. `yarn start`

## Contributing

Your contributions are welcome! If you have any questions or want to start to contribute to this library in any form, please open an issue. Feel free to open PR.

- - -

If there are any questions about this library or about any other topic, please contact me on Twitter  [@leonardomso](https://twitter.com/leonardomso) and I'll gladly answer it.
