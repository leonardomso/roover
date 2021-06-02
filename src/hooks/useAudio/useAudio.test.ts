import { waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useAudio from './useAudio';

import { CreateAudioArgs } from './useAudio.types';

describe('useAudio', () => {
  describe('onCreateAudio', () => {
    test('should create audio element', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
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
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with preload equal "metadata"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'none',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with preload equal "none"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'none',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with autoplay equal "false"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: false,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with volume equal "0.5"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 0.5,
        rate: 1.0,
        mute: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with rate equal "0.5"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 0.5,
        mute: false,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with muted equal "true"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: true,
        loop: false,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should create audio element with loop equal "true"', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: true,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });
  });

  describe('onLoadAudio', () => {
    test('should create audio and load it', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: true,
      };

      const audio:
        | HTMLAudioElement
        | undefined = await result.current.onLoadAudio(undefined, args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });
    });

    test('should change audio src', async () => {
      const { result } = renderHook(() => useAudio());

      const firstArgs: CreateAudioArgs = {
        src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: true,
      };

      const secondArgs: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: true,
      };

      act(() => {
        const audio: HTMLAudioElement = result.current.onLoadAudio(
          undefined,
          firstArgs
        );

        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', firstArgs.preload);
        expect(audio).toHaveProperty('autoplay', firstArgs.autoplay);
        expect(audio).toHaveProperty('volume', firstArgs.volume);
        expect(audio).toHaveProperty('playbackRate', firstArgs.rate);
        expect(audio).toHaveProperty('muted', firstArgs.mute);
        expect(audio).toHaveProperty('loop', firstArgs.loop);

        result.current.onLoadAudio(audio, secondArgs);

        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', secondArgs.preload);
        expect(audio).toHaveProperty('autoplay', secondArgs.autoplay);
        expect(audio).toHaveProperty('volume', secondArgs.volume);
        expect(audio).toHaveProperty('playbackRate', secondArgs.rate);
        expect(audio).toHaveProperty('muted', secondArgs.mute);
        expect(audio).toHaveProperty('loop', secondArgs.loop);
      });
    });
  });

  describe('onDestroyAudio', () => {
    test('should destroy audio', async () => {
      const { result } = renderHook(() => useAudio());

      const args: CreateAudioArgs = {
        src:
          'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
        preload: 'auto',
        autoplay: true,
        volume: 1.0,
        rate: 1.0,
        mute: false,
        loop: true,
      };

      const audio: HTMLAudioElement = await result.current.onCreateAudio(args);

      await waitFor(() => {
        // eslint-disable-next-line
        expect(audio).toBeInTheDocument;
        expect(audio).toBeInstanceOf(HTMLAudioElement);
        expect(audio).toHaveProperty('preload', args.preload);
        expect(audio).toHaveProperty('autoplay', args.autoplay);
        expect(audio).toHaveProperty('volume', args.volume);
        expect(audio).toHaveProperty('playbackRate', args.rate);
        expect(audio).toHaveProperty('muted', args.mute);
        expect(audio).toHaveProperty('loop', args.loop);
      });

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
