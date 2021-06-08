<br>
<p align="center">
<a href="https://github.com/leonardomso/roover">
<img src="https://i.imgur.com/sHCo4D0.png" alt="Roover" height="250" width="250"/>
</a>
</p>

<p align="center">
<b>Manage audio in React with ease</b>
</p>

[![Build Status](https://img.shields.io/github/workflow/status/leonardomso/roover/CI?style=flat&colorA=000000&colorB=000000)](https://github.com/leonardomso/roover/actions?query=workflow%3ALint)
[![Build Size](https://img.shields.io/bundlephobia/min/roover?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=roover)
[![Version](https://img.shields.io/npm/v/roover?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand)
[![Downloads](https://img.shields.io/npm/dt/roover.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand)

## Motivation

Modern applications are using audio all the time. Audio can turn a boring application into an interesting one, adding emotion to the content. Most of the modern applications that we use daily are using audio for at least in some part.

Work with audio in React applications is painful. There are not too many good libraries to manage audio and most of the time we need to create our solutions. Manage audio in a modern application is important and should be made by using the best tools and libraries.

The idea to create this library was to provide a powerful and lightweight audio library for React apps. A custom React Hook that is easy to integrate with and has a ton of features to help speed up development without having to worry about anything.

## Installation

```bash
yarn add roover
```

## Usage

All you need to do is import the `useRoover` hook and use it on your React component.

```typescript
import React from 'react';
import { useRoover } from 'roover';

const src =
  'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3';

const App = () => {
  const {
    initial,
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    onPlay,
    onPause,
  } = useRehawk({
    src,
    autoplay: true,
  });

  return (
    <div>
      <p>Ready: {ready ? 'true' : 'false'}</p>
      <p>Loading: {loading ? 'true' : 'false'}</p>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
    </div>
  );
};
```

## Example

To run the example do the following steps:

1. `git clone` the repository
2. `cd roover/example`
3. `yarn install`
4. `yarn start`

## Contributing

Your contributions are welcome! If you have any questions or want to start to contribute to this library in any form, please open an issue. Feel free to open PR.

If there are any questions about this library or about any other topic, please contact me on Twitter [@leonardomso](https://twitter.com/leonardomso) and I'll gladly answer it.

## License

MIT License © 2021 [Leonardo Maldonado](https://github.com/leonardomso)
