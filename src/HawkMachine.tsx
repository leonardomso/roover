import { Machine, assign } from 'xstate';

import {
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent,
  HawkErrorEvent,
  HawkDurationEvent,
} from './types';

const Hawk = Machine<
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent
>(
  {
    id: 'HawkMachine',
    initial: 'loading',
    context: {
      howl: null,
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
            actions: ['onReady'],
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
      onError: assign<HawkMachineContext, any>({
        error: (_, event) => (event as HawkErrorEvent).error,
      }),
      onMute: assign<HawkMachineContext, HawkMachineEvent>({
        muted: context => !context.muted,
      }),
      onLoop: assign<HawkMachineContext, HawkMachineEvent>({
        loop: context => !context.loop,
      }),
      onReady: assign<HawkMachineContext, any>({
        howl: (_, event) => (event as HawkDurationEvent).howl,
        duration: (_, event) => (event as HawkDurationEvent).duration,
      }),
    },
  }
);

export default Hawk;
