import { createMachine, assign } from 'xstate';

import {
  MachineContext,
  MachineEvent,
  MachineReadyEvent,
  MachineErrorEvent,
  MachineRateEvent,
  MachineVolumeEvent,
} from '../types';

const Machine = createMachine<MachineContext, MachineEvent>(
  {
    id: 'roover',
    initial: 'idle',
    context: {
      volume: 1.0,
      rate: 1.0,
      duration: 0,
      muted: false,
      loop: false,
      error: null,
    },
    states: {
      idle: {
        on: {
          LOAD: 'loading',
          ERROR: 'error',
        },
      },
      loading: {
        on: {
          READY: 'ready',
          ERROR: 'error',
        },
      },
      ready: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              PLAY: 'playing',
              PAUSE: 'paused',
            },
          },
          playing: {
            on: {
              PAUSE: 'paused',
            },
          },
          paused: {
            on: {
              PLAY: 'playing',
            },
          },
        },
        on: {
          LOAD: 'loading',
          END: 'ended',
          ERROR: 'error',
          VOLUME: {
            target: '',
            actions: 'onVolume',
          },
          RATE: {
            target: '',
            actions: 'onRate',
          },
          MUTE: {
            target: '',
            actions: 'onMute',
          },
          LOOP: {
            target: '',
            actions: 'onLoop',
          },
        },
      },
      ended: {
        on: {
          LOAD: 'loading',
          PLAY: 'ready',
        },
      },
      error: {
        on: {
          RETRY: 'loading',
        },
      },
    },
  },
  {
    actions: {
      onReady: assign<MachineContext, MachineEvent>({
        volume: (_, event) => (event as MachineReadyEvent).volume,
        rate: (_, event) => (event as MachineReadyEvent).rate,
        duration: (_, event) => (event as MachineReadyEvent).duration,
        muted: (_, event) => (event as MachineReadyEvent).muted,
        loop: (_, event) => (event as MachineReadyEvent).loop,
      }),
      onVolume: assign<MachineContext, MachineEvent>({
        volume: (_, event) => (event as MachineVolumeEvent).volume,
      }),
      onRate: assign<MachineContext, MachineEvent>({
        rate: (_, event) => (event as MachineRateEvent).rate,
      }),
      onMute: assign<MachineContext, MachineEvent>({
        muted: (context, _) => !context.muted,
      }),
      onLoop: assign<MachineContext, MachineEvent>({
        loop: (context, _) => !context.loop,
      }),
      onError: assign<MachineContext, MachineEvent>({
        error: (_, event) => (event as MachineErrorEvent).error,
      }),
    },
  }
);

export default Machine;
