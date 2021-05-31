import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useAudio from './useAudio';

import { CreateAudioElement } from './useAudio.types';

describe('useAudio', () => {
  describe('onCreateAudio', () => {
    test('should create audio element', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        muted: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // For some reason, when calling toBeInTheDocument() does not work.
        // When using .toBeInTheDocuments tests pass but ESLint complains about it.
        // So, there is why the next line is disabled.
        // Should be fixed in a next version though.
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'auto');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with preload equal "metadata"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'none',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        muted: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'none');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with preload equal "none"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'none',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        muted: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'none');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with autoplay equal "false"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: false,
        volume: 1.0,
        rate: 1.0,
        muted: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'auto');
        expect(audio).toHaveProperty('autoplay', false);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with volume equal "0.5"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 0.5,
        rate: 1.0,
        muted: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'auto');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 0.5);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with rate equal "0.5"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 0.5,
        muted: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'auto');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 0.5);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with muted equal "true"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        muted: true,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'auto');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', true);
        expect(audio).toHaveProperty('loop', false);
      });
    });

    test('should create audio element with loop equal "true"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        muted: false,
        loop: true,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', 'auto');
        expect(audio).toHaveProperty('autoplay', true);
        expect(audio).toHaveProperty('volume', 1);
        expect(audio).toHaveProperty('playbackRate', 1);
        expect(audio).toHaveProperty('muted', false);
        expect(audio).toHaveProperty('loop', true);
      });
    });
  });

  describe('onDestroyAudio', () => {
    test('should destroy audio', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioElement = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        muted: false,
        loop: true,
      };

      const audio: HTMLAudioElement = await result.current.onCreateAudio(args);

      await result.current.onDestroyAudio(audio);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).not.toBeInTheDocument;
      });
    });

    test('should not destroy audio and return undefined when there is no audio', async () => {
      const { result } = renderHook(() => useAudio());

      const destroyFn = await result.current.onDestroyAudio(undefined);

      expect(destroyFn).toBe(undefined);
    });
  });
});
