import { renderHook } from '@testing-library/react-hooks';
// import { waitFor, act } from '@testing-library/react';

import useRoover from './useRoover';

import { Args } from './useRoover.types';

describe('useRoover', () => {
  test('should render correctly', async () => {
    const args: Args = {
      src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
      preload: 'auto',
      autoplay: true,
      volume: 1.0,
      rate: 1.0,
      muted: false,
      loop: false,
    };

    const { result } = renderHook(() => useRoover(args));

    expect(result.current.idle).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.ready).toBe(false);
    expect(result.current.playing).toBe(false);
    expect(result.current.paused).toBe(false);
    expect(result.current.ended).toBe(undefined);
  });

  // describe('onToggle', () => {
  //   test('should create new audio and play it', async () => {
  //     const args: Args = {
  //       src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
  //       preload: 'auto',
  //       autoplay: true,
  //       volume: 1.0,
  //       rate: 1.0,
  //       muted: false,
  //       loop: false,
  //     };

  //     const { result } = renderHook(() => useRoover(args));

  //     expect(result.current.idle).toBe(true);
  //     expect(result.current.loading).toBe(false);
  //     expect(result.current.ready).toBe(false);
  //     expect(result.current.playing).toBe(false);
  //     expect(result.current.paused).toBe(false);
  //     expect(result.current.ended).toBe(undefined);

  //     act(() => {
  //       result.current.onToggle();
  //     });

  //     await waitFor(() => {
  //       expect(result.current.idle).toBe(false);
  //       expect(result.current.loading).toBe(false);
  //       expect(result.current.ready).toBe(true);
  //       expect(result.current.playing).toBe(true);
  //       expect(result.current.paused).toBe(false);
  //       expect(result.current.ended).toBe(undefined);
  //     });
  //   });
  // });
});
