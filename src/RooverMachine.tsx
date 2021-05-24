import { Machine, assign } from 'xstate';

import {
  RooverMachineContext,
  RooverMachineState,
  RooverMachineEvents,
  RooverOnErrorEvent,
  RooverOnReadyEvent,
} from './types';

const Roover = Machine<
  RooverMachineContext,
  RooverMachineState,
  RooverMachineEvents
>(
  {
    id: 'RooverMachine',
    initial: 'loading',
    context: {
      audio: null,
      duration: 0,
      muted: false,
      loop: false,
      error: null,
    },
    states: {
      loading: {
        on: {
          READY: {
            target: 'ready',
            actions: 'onReady',
          },
          ERROR: {
            target: 'error',
            actions: 'onError',
          },
        },
      },
      ready: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              PLAY: 'playing',
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
          playing: {
            on: {
              PAUSE: 'paused',
              STOP: 'stopped',
              MUTE: {
                target: '',
                actions: 'onMute',
              },
              LOOP: {
                target: '',
                actions: 'onLoop',
              },
              END: 'ended',
              ERROR: {
                target: 'error',
                actions: 'onError',
              },
            },
          },
          paused: {
            on: {
              PLAY: 'playing',
              STOP: 'stopped',
              MUTE: {
                target: '',
                actions: 'onMute',
              },
              LOOP: {
                target: '',
                actions: 'onLoop',
              },
              END: 'ended',
            },
          },
          stopped: {
            on: {
              PLAY: 'playing',
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
              RETRY: 'idle',
            },
          },
          error: {
            type: 'final',
          },
        },
      },
      error: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      onError: assign<RooverMachineContext, any>({
        error: (_, event) => (event as RooverOnErrorEvent).error,
      }),
      onMute: assign<RooverMachineContext, RooverMachineEvents>({
        muted: context => !context.muted,
      }),
      onLoop: assign<RooverMachineContext, RooverMachineEvents>({
        loop: context => !context.loop,
      }),
      onReady: assign<RooverMachineContext, any>({
        duration: (_, event) => (event as RooverOnReadyEvent).duration,
        muted: (_, event) => (event as RooverOnReadyEvent).muted,
        loop: (_, event) => (event as RooverOnReadyEvent).loop,
      }),
    },
  }
);

export default Roover;
