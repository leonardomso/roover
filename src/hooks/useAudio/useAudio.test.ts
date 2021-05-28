describe('useAudio', () => {
  test('should load audio', () => {
    // const { result } = renderHook(() => useAudio());

    // const args: CreateAudioArgs = {
    //   src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
    //   preload: 'auto',
    //   autoplay: true,
    //   volume: 1.0,
    //   rate: 1.0,
    //   muted: false,
    //   loop: false,
    // };

    // act(() => {
    //   result.current.onLoad(undefined, args);
    // });

    expect(window.Audio.length).toBe(1);
  });

  test('should destroy audio', async () => {
    // const { result } = renderHook(() => useAudio());

    // const args: CreateAudioArgs = {
    //   src: 'https://www.theincomparable.com/podcast/batmanuniversity302.mp3',
    //   preload: 'auto',
    //   autoplay: true,
    //   volume: 1.0,
    //   rate: 1.0,
    //   muted: false,
    //   loop: false,
    // };

    // await act(async () => {
    //   const audio = await result.current.onLoad(undefined, args);
    //   await result.current.onDestroy(audio);
    // });

    expect(window.Audio.length).toBe(1);
  });
});
