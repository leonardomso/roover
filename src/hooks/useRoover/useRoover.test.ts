import { renderHook } from '@testing-library/react-hooks';
// import { act, waitFor } from '@testing-library/react';

import useRoover from './useRoover';

import { Args } from './useRoover.types';

describe('useRoover', () => {
  test('should render correctly', () => {
    const args: Args = {
      src:
        'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
      preload: 'auto',
      autoplay: false,
      volume: 1.0,
      rate: 1.0,
      mute: false,
      loop: false,
    };

    const { result } = renderHook(() => useRoover(args));

    expect(result.current.initial).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.ready).toBe(false);
    expect(result.current.idle).toBe(false);
    expect(result.current.playing).toBe(false);
    expect(result.current.paused).toBe(false);
    expect(result.current.end).toBe(false);
  });

  // describe('onToggle', () => {
  //   test('should create new audio and not play it ', async () => {
  //     const args: Args = {
  //       src:
  //         'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
  //       preload: 'auto',
  //       autoplay: false,
  //       volume: 1.0,
  //       rate: 1.0,
  //       mute: false,
  //       loop: false,
  //     };
  //     const { result } = renderHook(() => useRoover(args));

  //     expect(result.current.initial).toBe(true);
  //     expect(result.current.loading).toBe(false);
  //     expect(result.current.ready).toBe(false);
  //     expect(result.current.idle).toBe(false);
  //     expect(result.current.playing).toBe(false);
  //     expect(result.current.paused).toBe(false);
  //     expect(result.current.end).toBe(false);

  //     act(() => result.current.onToggle());

  //     await waitFor(() => {
  //       expect(result.current.initial).toBe(false);
  //       expect(result.current.loading).toBe(false);
  //       expect(result.current.ready).toBe(true);
  //       expect(result.current.idle).toBe(true);
  //       expect(result.current.playing).toBe(false);
  //       expect(result.current.paused).toBe(false);
  //       expect(result.current.end).toBe(false);
  //     });
  //   });
  // });
});
